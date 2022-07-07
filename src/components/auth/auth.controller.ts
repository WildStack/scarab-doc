import { notification } from 'antd';
import { AxiosError } from 'axios';
import { inject } from 'inversify';
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
      this.docEditorState.docSession = data.docState;
      this.authState.user = data.user;

      // update state
      this.authState.isAuth = true;
    } catch (error) {
      let errMessage: string;

      if (error instanceof AxiosError) {
        // show label
        console.log('error');
        console.log(error);
        errMessage = error.response?.data?.message || 'unknown error';
      } else {
        errMessage = 'unknown error';
      }

      notification.error({
        message: errMessage,
      });
    }
  }
}

