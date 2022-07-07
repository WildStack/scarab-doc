import { makeAutoObservable } from 'mobx';
import { Singleton } from '../../common/ioc/container.decorator';
import { User } from '../../models/state/user';

@Singleton
export class AuthState {
  private _isAuth: boolean = false;
  private _user: User;

  constructor() {
    makeAutoObservable(this);
  }

  public get isAuth(): boolean {
    return this._isAuth;
  }

  public set isAuth(value: boolean) {
    this._isAuth = value;
  }

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
  }
}

