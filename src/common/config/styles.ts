import { createStyle } from '../index';
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
});

