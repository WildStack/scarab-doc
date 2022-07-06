import { useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant, Operation, Transforms } from 'slate';
import { withReact, Slate, Editable, ReactEditor } from 'slate-react';
import { roundHeight } from '../../libs/common';
import { DocEditorType } from './declares';

function getWidthOfText(txt: string) {
  const el = document.createElement('span');
  el.style.visibility = 'hidden';
  el.style.position = 'fixed';
  el.style.pointerEvents = 'none';
  el.innerText = txt;

  document.body.appendChild(el);
  const offsetWidth = el.offsetWidth;
  document.body.removeChild(el);

  return offsetWidth;
}

const initialValue: Descendant[] = [
  {
    type: DocEditorType.PARAGRAPH,
    children: [{ text: 'Start typing...' }],
  },
];

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const DocEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const item = localStorage.getItem('content');
  const inistialLoadedValue = useMemo(() => (item ? JSON.parse(item) : initialValue), []);

  const [text, setText] = useState('');

  const getCurrentNode = () => {
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
  };

  const insertNode = () => {
    Transforms.insertNodes(
      editor,
      {
        type: DocEditorType.PARAGRAPH,
        children: [{ text: 'aaaaaaaaaaa' + randomIntFromInterval(0, 100) }],
      },
      { at: [editor.children.length] }
    );
  };

  const removeNode = () => {
    Transforms.removeNodes(editor, { at: [editor.children.length - 1] });
  };

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
  };

  // const currentNodePosition
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
  //       y: roundHeight(y),
  //     });
  //   }, 1500);

  //   return () => clearInterval(interval);
  // }, [editor, getCurrentNode]);

  return (
    <Slate
      editor={editor}
      value={inistialLoadedValue}
      onChange={value => {
        const isAstChange = editor.operations.some(op => !Operation.isSelectionOperation(op));
        const operation = editor.operations.at(0);

        // console.log(operation);

        if (Operation.isTextOperation(operation) && operation.type === 'insert_text') {
          setText(operation.text);
        }

        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem('content', content);
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
      />
    </Slate>
  );
};

// if (event.key === '&') {
//   // Prevent the ampersand character from being inserted.
//   event.preventDefault();
//   // Execute the `insertText` method when the event occurs.
//   editor.insertText('and');
// }

// if (event.key === '7') {
//   Transforms.insertText(editor, '2asdas', {
//     at: { path: [3, 0], offset: 0 },
//   });
// }

// if (event.key === 'Backspace') {
//   Transforms.delete(editor, {
//     at: { path: [3, 0], offset: offset },
//   });
// }

// console.log(getCurrentNode());

// replaceNode(7, text);

// if (event.key === '/') {
//   replaceNode(7);
// }

// //! insert node at the and of line
// if (event.key === '=') {
//   insertNode();
// }

// //! removes whole node
// if (event.key === '-') {
//   removeNode();

// }

