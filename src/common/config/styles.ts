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
});

