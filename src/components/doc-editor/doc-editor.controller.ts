import { inject } from 'inversify';
import { toJS } from 'mobx';
import { showErroNotification } from '../../common';
import { http } from '../../common/http';
import { Singleton } from '../../common/ioc/container.decorator';
import { User } from '../../models/state/user';
import { DocEditorState } from './doc-editor.state';

@Singleton
export class DocEditorController {
  @inject(DocEditorState) private readonly docEditorState: DocEditorState;

  public async saveContent(content: string, uuid: string, top: number, left: number) {
    try {
      const data = await http.put('/doc-data', { content, uuid, top, left });
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

  public updateCaretPosition(res: { top: number; left: number; uuid: string }) {
    const user = this.docEditorState.docSession.users.find(el => el.uuid === res.uuid);

    if (user) {
      user.top = res.top;
      user.left = res.left;
    }
  }

  public updateUser(user: User, type: 'add' | 'del') {
    if (type === 'add') {
      const tempSession = Object.assign({}, this.docEditorState.docSession);
      tempSession.users.push(user);
      this.docEditorState.docSession = tempSession;

      console.log(toJS(this.docEditorState.docSession));
    }

    if (type === 'del') {
      const tempSession = this.docEditorState.docSession;
      tempSession.users = tempSession.users.filter(el => el.uuid !== user.uuid);
      this.docEditorState.docSession = tempSession;

      console.log(toJS(this.docEditorState.docSession));
    }
  }
}

