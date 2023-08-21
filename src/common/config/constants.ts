export const consts = {
  title: 'Scarab Doc',
  subTitle: 'New Document',
  backendApiUrl: import.meta.env.VITE_APP_BACKEND || '',

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
