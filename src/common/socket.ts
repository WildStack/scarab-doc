import { io, Socket } from 'socket.io-client';
import { AuthState } from '../presentation/auth/auth.state';
import { consts } from './config/constants';
import { IocContainer } from './ioc/container';

let socketInstance: Socket | null = null;

export default function getSocketInstance() {
  const authState = IocContainer.getContainer().get(AuthState);

  if (socketInstance == null) {
    socketInstance = io(consts.backendApiUrl, {
      transports: ['websocket'],
      timeout: 60000,
      auth: cb => cb({ uuid: authState.user.uuid }),
    });
  }

  return socketInstance;
}
