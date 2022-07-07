/* eslint-disable react-hooks/exhaustive-deps */
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import getSocketInstance from '../../common/socket';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useInjection } from 'inversify-react';
import { DocEditorController } from '../doc-editor/doc-editor.controller';
import { DocEditorState } from '../doc-editor/doc-editor.state';
import { observer } from 'mobx-react';
import { consts } from '../../common/config/constants';
import { getWidthOfText } from '../../common';
import { AuthState } from '../auth/auth.state';
import { CustomCursor } from '../custom-cursor';
import { ViewUpdate } from '@codemirror/view';
import { User } from '../../models/state/user';

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
      authState.user.left
    );

    docEditorController.updateDocSession(value);

    const socket = getSocketInstance();
    socket.emit('distribute_change', value);
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
      const x = document.querySelector<HTMLDivElement>('.cm-editor');

      setOffset({
        top: x?.getBoundingClientRect().top || 0,
        left: x?.getBoundingClientRect().left || 0,
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
            const top =
              dat.line.number * consts.decoEditor.charHeight - consts.decoEditor.charHeight;
            const text = docEditorState.docSession.content?.slice(dat.line.from, dat.line.to);
            const caretOffset = dat.selectionAsSingle.to - dat.line.from;

            const left = getWidthOfText(text?.slice(0, caretOffset));

            // console.log(dat);
            // console.log({ top, left });

            const socket = getSocketInstance();
            socket.emit('distribute_caret', { top, left, uuid: authState.user.uuid });
          }}
          onChange={onChange}
        >
          {docEditorState.docSession.users.map(user => {
            return user.uuid !== authState.user.uuid ? (
              <div
                key={user.uuid}
                style={{
                  position: 'fixed',
                  zIndex: 10,
                  left: offset.left + user.left,
                  top: offset.top + user.top,
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

    socket.on('user_removed', (res: User) => {
      docEditorController.updateUser(res, 'del');
    });
    socket.on('user_added', (res: User) => {
      docEditorController.updateUser(res, 'add');
    });

    socket.on('notify_update', (res: string) => {
      // update content
      docEditorController.updateDocSession(res);
    });
    socket.on('notify_update_caret', (res: { top: number; left: number; uuid: string }) => {
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

