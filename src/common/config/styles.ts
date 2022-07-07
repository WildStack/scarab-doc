import { createStyle } from '../helper';
import { consts } from './constants';

export const styles = createStyle({
  topBar: {
    backgroundColor: '#FFFFFF',
    height: consts.topBar.height,
  },
  spacer: {
    width: '100%',
    height: consts.spacer.height,
    backgroundColor: '#cacccf',
  },
  docEditorEditable: {
    padding: 5,
    margin: '0 auto',
    width: 1100,
    backgroundColor: 'white',
    borderRadius: 0,
    minHeight: 800,
  },

  cursor: {
    position: 'absolute',
    top: -30,
    color: 'black',
    borderRadius: 3,
    margin: 0,
    padding: '2px 5px',
    fontSize: 14,
  },
});

