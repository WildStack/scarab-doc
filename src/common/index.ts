import { CSSProperties } from 'react';
import { consts } from './config/constants';

/**
 * rounds by 20 because thats height of each div in doc
 */
export const roundHeight = (x: number) => {
  return Math.ceil(x / consts.decoEditor.charHeight) * consts.decoEditor.charHeight;
};

export const getWidthOfText = (txt: string) => {
  const el = document.createElement('span');
  el.style.visibility = 'hidden';
  el.style.position = 'fixed';
  el.style.pointerEvents = 'none';
  el.innerText = txt;

  document.body.appendChild(el);
  const offsetWidth = el.offsetWidth;
  document.body.removeChild(el);

  return offsetWidth;
};

export const createStyle = <T extends string>(s: Record<T, CSSProperties>) => s;

