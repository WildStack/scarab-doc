import { User } from './user';

export interface DocSession {
  users: User[];
  content: any;
  uuid: string;
}

