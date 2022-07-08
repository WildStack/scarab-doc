import { inject } from 'inversify';
import { showErroNotification } from '../../common/helper';
import { http } from '../../common/http';
import { Singleton } from '../../common/ioc/container.decorator';
import { NotifyUpdateCaret } from '../../models/socket/notify-update-caret';
import { User } from '../../models/state/user';
import { DocEditorState } from './doc-editor.state';

@Singleton
export class DocEditorController {
  @inject(DocEditorState) private readonly docEditorState: DocEditorState;

  public async saveContent(content: string, uuid: string, top: number, currentLineText: string) {
    try {
      const data = await http.put('/doc-data', { content, uuid, top, currentLineText });
      return data;
    } catch (error) {
      showErroNotification(error);
      return null;
    }
  }

  public updateDocSession(content: string) {
    this.docEditorState.docSession = {
      ...this.docEditorState.docSession,
      content,
    };
  }

  public updateCaretPosition(res: NotifyUpdateCaret) {
    const user = this.docEditorState.docSession.users.find(el => el.uuid === res.uuid);

    if (user) {
      user.top = res.top;
      user.currentLineText = res.currentLineText;
    }
  }

  public updateUser(user: User, type: 'add' | 'del') {
    if (type === 'add') {
      const tempSession = Object.assign({}, this.docEditorState.docSession);
      tempSession.users.push(user);
      this.docEditorState.docSession = tempSession;
    }

    if (type === 'del') {
      const tempSession = this.docEditorState.docSession;
      tempSession.users = tempSession.users.filter(el => el.uuid !== user.uuid);
      this.docEditorState.docSession = tempSession;
    }
  }
}

