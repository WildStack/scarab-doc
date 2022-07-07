import { Descendant } from 'slate';
import { DocEditorType } from '../../presentation/doc-editor/declares';

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

  socketEvents: {
    userRemoved: 'user_removed',
    userAdded: 'user_added',
    notifyUpdate: 'notify_update',
    notifyUpdateCaret: 'notify_update_caret',
    distributeCaret: 'distribute_caret',
    distributeChange: 'distribute_change',
  },
};

export const docEditorStateDefaultValue: Descendant[] = [
  {
    type: DocEditorType.PARAGRAPH,
    children: [{ text: 'Start typing...' }],
  },
];

