import { makeAutoObservable } from 'mobx';
import { Singleton } from '../../common/ioc/container.decorator';
import { DocSession } from '../../models/state/doc-session';

@Singleton
export class DocEditorState {
  private _docSession: DocSession;

  constructor() {
    makeAutoObservable(this);
  }

  public get docSession(): DocSession {
    return this._docSession;
  }

  public set docSession(value: DocSession) {
    this._docSession = value;
  }

  public get getDocContent() {
    return JSON.parse(this._docSession.content);
  }
}
