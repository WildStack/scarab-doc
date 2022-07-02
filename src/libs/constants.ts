import { CSSProperties } from 'react';

/*===========================================
***************** CONSTANTS *****************
============================================*/
export const createStyle = <T extends string>(s: Record<T, CSSProperties>) => s;

export const consts = {
  title: 'Green Doc',
  subTitle: 'New Document',

  topBar: {
    height: 80,
  },

  spacer: {
    height: 20,
  },
};

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

