import { makeAutoObservable } from 'mobx';
import { Descendant } from 'slate';
import { docEditorStateDefaultValue } from '../../common/config/constants';
import { Singleton } from '../../common/ioc/container.decorator';
import { DocSession } from '../../models/state/doc-session';

@Singleton
export class DocEditorState {
  public static defaultValue: Descendant[] = docEditorStateDefaultValue;

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
    return this._docSession.content
      ? (JSON.parse(this._docSession.content) as Descendant[])
      : DocEditorState.defaultValue;
  }
}

