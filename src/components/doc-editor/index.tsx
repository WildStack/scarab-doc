/* eslint-disable no-restricted-globals */
import { useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { withReact, Slate, Editable } from 'slate-react';
import { DocEditorType } from './declares';

const initialValue: Descendant[] = [
  {
    type: DocEditorType.PARAGRAPH,
    children: [{ text: 'Start typing...' }],
  },
];

export const DocEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  console.log(document.body.scrollHeight);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        style={{
          padding: 20,
          margin: '0 auto',
          maxWidth: 1000,
          backgroundColor: 'white',
          borderRadius: 0,
          minHeight: 800,
        }}
        onKeyDown={event => {
          if (event.key === '&') {
            // Prevent the ampersand character from being inserted.
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText('and');
            // editor.addMark
          }
        }}
      />
    </Slate>
  );
};

