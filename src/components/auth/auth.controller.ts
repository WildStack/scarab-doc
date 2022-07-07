import { inject } from 'inversify';
import { showErroNotification } from '../../common';
import { http } from '../../common/http';
import { Singleton } from '../../common/ioc/container.decorator';
import { DocSession } from '../../models/state/doc-session';
import { User } from '../../models/state/user';
import { DocEditorState } from '../doc-editor/doc-editor.state';
import { AuthState } from './auth.state';

@Singleton
export class AuthController {
  @inject(AuthState) private readonly authState: AuthState;
  @inject(DocEditorState) private readonly docEditorState: DocEditorState;

  public async authenticate(username: string): Promise<void> {
    try {
      const { data } = await http.post<{ docState: DocSession; user: User }>('/auth', {
        username,
      });

      // set user
      this.docEditorState.docSession = data.docState || '';
      this.authState.user = data.user;

      // update state
      this.authState.isAuth = true;
    } catch (error) {
      showErroNotification(error);
    }
  }
}

