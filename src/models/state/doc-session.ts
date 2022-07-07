import { User } from './user';

export interface DocSession {
  users: User[];
  content: string;
  uuid: string;
}

