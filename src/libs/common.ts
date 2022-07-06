import { consts } from './constants';

/**
 * rounds by 20 because thats height of each div in doc
 */
export function roundHeight(x: number) {
  return Math.ceil(x / consts.decoEditor.charHeight) * consts.decoEditor.charHeight;
}

/**
 * rounds by 5 because thats width of each char in doc
 */
export function roundWidth(x: number) {
  return Math.ceil(x / consts.decoEditor.charWidth) * consts.decoEditor.charWidth;
}

