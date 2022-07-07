import { Descendant } from 'slate';
import { DocEditorType } from '../../components/doc-editor/declares';

export const consts = {
  title: 'Green Doc',
  subTitle: 'New Document',
  backendApiUrl: process.env.REACT_APP_BACKEND || '',
  backendApiUrlRoot: process.env.REACT_APP_BACKEND_ROOT || '',

  topBar: {
    height: 80,
  },

  spacer: {
    height: 20,
  },

  decoEditor: {
    charHeight: 20,
  },
};

export const docEditorStateDefaultValue: Descendant[] = [
  {
    type: DocEditorType.PARAGRAPH,
    children: [{ text: 'Start typing...' }],
  },
];

