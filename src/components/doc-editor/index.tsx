import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor, Operation, Transforms } from 'slate';
import { withReact, Slate, Editable, ReactEditor } from 'slate-react';
import { roundHeight } from '../../common';
import { consts } from '../../common/config/constants';
import getSocketInstance from '../../common/socket';
import { DocSession } from '../../models/state/doc-session';
import { User } from '../../models/state/user';
import { DocEditorType } from './declares';
import { DocEditorState } from './doc-editor.state';

export const DocEditor: React.FC = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const item = localStorage.getItem('content');
  const inistialLoadedValue = useMemo(
    () => (item ? JSON.parse(item) : DocEditorState.defaultValue),
    [item]
  );

  const getCurrentNode = useCallback(() => {
    const pageNumber = editor.selection?.anchor.path[0];
    const pageOffset = editor.selection?.anchor.offset;

    if (pageNumber !== undefined && pageOffset !== undefined) {
      const element = editor.children.at(pageNumber);

      if (element !== undefined) {
        return {
          pageNumber,
          pageOffset,
          element,
        };
      }
    }

    return null;
  }, [editor.children, editor.selection?.anchor.offset, editor.selection?.anchor.path]);

  const replaceNode = (at: number, newText?: string) => {
    let path = at >= editor.children.length ? at - 1 : at;

    Transforms.removeNodes(editor, { at: { path: [path, 0], offset: 0 } });
    Transforms.insertNodes(
      editor,
      {
        type: DocEditorType.PARAGRAPH,
        children: [{ text: newText || '' }],
      },
      { at: [path] }
    );
  };

  useEffect(() => {
    const socket = getSocketInstance();
    socket.connect();

    console.log(socket);

    socket.on('user_removed', (res: User) => {
      // update state
      console.log('user_removed');
      console.log(res);
    });
    socket.on('user_added', (res: User) => {
      // update state
      console.log('user_added');
      console.log(res);
    });
  }, []);

  // // const currentNodePosition
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentElement = getCurrentNode()?.element;
  //     if (!currentElement) return;

  //     const currentDom = ReactEditor.toDOMNode(editor, currentElement);
  //     const editorDom = ReactEditor.toDOMNode(editor, editor);

  //     const currentDomClient = currentDom.getBoundingClientRect();

  //     // calculate y
  //     const y =
  //       currentDomClient.top + currentDomClient.height / 2 - editorDom.getBoundingClientRect().top;

  //     // calculate x
  //     const caretPosOffset = window.getSelection()?.getRangeAt(0).startOffset || 0;
  //     const x = getWidthOfText(currentDom.innerText.slice(0, caretPosOffset));

  //     console.log({
  //       x,
  //       y: roundHeight(y) - consts.decoEditor.charHeight,
  //     });
  //   }, 1500);

  //   return () => clearInterval(interval);
  // }, [editor, getCurrentNode]);

  return (
    <Slate
      editor={editor}
      value={inistialLoadedValue}
      onChange={value => {
        const operations = editor.operations;
        const isAstChange = operations.some(op => !Operation.isSelectionOperation(op));

        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem('content', content);
        }

        if (
          operations.length === 1 &&
          (operations.at(0)?.type === 'remove_text' || operations.at(0)?.type === 'insert_text')
        ) {
          // update single
        } else {
          // all other
        }
      }}
    >
      <Editable
        style={{
          padding: 5,
          margin: '0 auto',
          width: 1100,
          backgroundColor: 'white',
          borderRadius: 0,
          minHeight: 800,
        }}
        onKeyUp={event => {
          //! replaces node
          if (event.key === '/') {
            replaceNode(7, 'new text');
          }
        }}
      />
    </Slate>
  );
};

//  onKeyUp={event => {
//         //! replaces node
//         if (event.key === '/') {
//           replaceNode(7, 'new text');
//         }

//         //! insert node at the and of line
//         if (event.key === '=') {
//           insertNode();
//         }

//         //! removes whole node
//         if (event.key === '-') {
//           removeNode();
//         }
//       }}

// onKeyUp={event => {
//   // if (event.key === '&') {
//   //   // Prevent the ampersand character from being inserted.
//   //   event.preventDefault();
//   //   // Execute the `insertText` method when the event occurs.
//   //   editor.insertText('and');
//   // }

//   // if (event.key === '7') {
//   //   Transforms.insertText(editor, '2asdas', {
//   //     at: { path: [3, 0], offset: 0 },
//   //   });
//   // }
//   // if (event.key === 'Backspace') {
//   //   Transforms.delete(editor, {
//   //     at: { path: [3, 0], offset: offset },
//   //   });
//   // }
//   // console.log(getCurrentNode());
//   // replaceNode(7, text);
//   const currentNode = getCurrentNode();
//   // console.log('-------------------key up');
//   // console.log(currentNode);
//   // console.log(currentNode?.element.children?.at(0));
//   // console.log('-------------------');

//   if (event.key === '/') {
//     replaceNode(7, 'new text');
//   }

//   //! insert node at the and of line
//   if (event.key === '=') {
//     insertNode();
//   }

//   //! removes whole node
//   if (event.key === '-') {
//     removeNode();
//   }

// }}

// const insertNode = () => {
//   Transforms.insertNodes(
//     editor,
//     {
//       type: DocEditorType.PARAGRAPH,
//       children: [{ text: 'aaaaaaaaaaa' + randomIntFromInterval(0, 100) }],
//     },
//     { at: [editor.children.length] }
//   );
// };

// const removeNode = () => {
//   Transforms.removeNodes(editor, { at: [editor.children.length - 1] });
// };

// at the end of line
// Transforms.removeNodes(editor, { at: { path: [editor.children.length - 1, 0], offset: 0 } });
// Transforms.insertNodes(
//   editor,
//   {
//     type: DocEditorType.PARAGRAPH,
//     children: [{ text: randomIntFromInterval(0, 100).toString() }],
//   },
//   { at: [editor.children.length] }

// );

// function randomIntFromInterval(min: number, max: number) {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);

// }

