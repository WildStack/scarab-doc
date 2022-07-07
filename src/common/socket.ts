import { io, Socket } from 'socket.io-client';
import { AuthState } from '../components/auth/auth.state';
import { consts } from './config/constants';
import { IocContainer } from './ioc/container';

let socketInstance: Socket | null = null;

export default function getSocketInstance() {
  const authState = IocContainer.getContainer().get(AuthState);

  if (socketInstance == null) {
    socketInstance = io(consts.backendApiUrlRoot, {
      transports: ['websocket'],
      timeout: 60000,
      auth: cb => cb({ uuid: authState.user.uuid }),
    });

    socketInstance.emit('saddas');
  }

  return socketInstance;
}

