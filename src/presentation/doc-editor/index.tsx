/* eslint-disable react-hooks/exhaustive-deps */
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import getSocketInstance from '../../common/socket';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useInjection } from 'inversify-react';
import { DocEditorController } from './doc-editor.controller';
import { DocEditorState } from './doc-editor.state';
import { observer } from 'mobx-react';
import { consts } from '../../common/config/constants';
import { getWidthOfText } from '../../common/helper';
import { AuthState } from '../auth/auth.state';
import { CustomCursor } from '../../fragments/cursor';
import { ViewUpdate } from '@codemirror/view';
import { User } from '../../models/state/user';
import { NotifyUpdateCaret } from '../../models/socket/notify-update-caret';

const FinalContent = observer(() => {
  // local
  const el = useRef<ReactCodeMirrorRef>(null);
  const [offset, setOffset] = useState({
    top: 0,
    left: 0,
  });

  // state
  const docEditorController = useInjection(DocEditorController);
  const docEditorState = useInjection(DocEditorState);
  const authState = useInjection(AuthState);

  const onChange = useCallback(async (value: string, x: ViewUpdate) => {
    docEditorController.saveContent(
      value,
      authState.user.uuid,
      authState.user.top,
      authState.user.currentLineText
    );
    docEditorController.updateDocSession(value);

    const socket = getSocketInstance();
    socket.emit(consts.socketEvents.distributeChange, value);
  }, []);

  useEffect(() => {
    const seter = () => {
      const element = document.querySelector<HTMLDivElement>('.cm-editor');

      setOffset({
        left: element?.getBoundingClientRect().left || 0,
        top: element?.getBoundingClientRect().top || 0,
      });
    };

    window.addEventListener('resize', () => seter());
    return () => window.removeEventListener('resize', () => seter());
  }, []);

  useEffect(() => {
    if (el.current) {
      const temp = document.querySelector<HTMLDivElement>('.cm-editor');

      setOffset({
        top: temp?.getBoundingClientRect().top || 0,
        left: temp?.getBoundingClientRect().left || 0,
      });
    }
  }, [el.current]);

  return (
    <Fragment>
      <div style={{ margin: '0 auto' }}>
        <CodeMirror
          value={docEditorState.docSession.content || ''}
          height="800px"
          width="1100px"
          theme={'dark'}
          style={{ position: 'relative' }}
          ref={el}
          basicSetup={{ lineNumbers: false, foldGutter: false }}
          onStatistics={dat => {
            const { charHeight } = consts.decoEditor;

            const top = dat.line.number * charHeight - charHeight;
            const text = docEditorState.docSession.content?.slice(dat.line.from, dat.line.to);
            const caretOffset = dat.selectionAsSingle.to - dat.line.from;
            const currentLineText = text?.slice(0, caretOffset);
            const socket = getSocketInstance();

            socket.emit(consts.socketEvents.distributeCaret, {
              top,
              currentLineText: currentLineText,
              uuid: authState.user.uuid,
            });
          }}
          onChange={onChange}
        >
          {docEditorState.docSession.users.map(user => {
            return user.uuid !== authState.user.uuid &&
              !(user.currentLineText === '' && user.top === 0) ? (
              <div
                key={user.uuid}
                style={{
                  position: 'fixed',
                  zIndex: 10,
                  left: offset.left + getWidthOfText(user.currentLineText) - 2,
                  top: offset.top + user.top - 1,
                }}
              >
                <CustomCursor name={user.username} color={user.color} />
              </div>
            ) : null;
          })}
        </CodeMirror>
      </div>
    </Fragment>
  );
});

export const Final = () => {
  const docEditorController = useInjection(DocEditorController);

  useEffect(() => {
    const socket = getSocketInstance();
    socket.connect();

    socket.on(consts.socketEvents.userAdded, (res: User) => {
      // add user and caret
      docEditorController.updateUser(res, 'add');
    });

    socket.on(consts.socketEvents.userRemoved, (res: User) => {
      // remove user and caret
      docEditorController.updateUser(res, 'del');
    });

    socket.on(consts.socketEvents.notifyUpdate, (res: string) => {
      // update content
      docEditorController.updateDocSession(res);
    });
    socket.on(consts.socketEvents.notifyUpdateCaret, (res: NotifyUpdateCaret) => {
      // update caret
      docEditorController.updateCaretPosition(res);
    });
  }, []);

  return (
    <Fragment>
      <FinalContent />
    </Fragment>
  );
};

