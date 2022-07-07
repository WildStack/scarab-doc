import { notification } from 'antd';
import { AxiosError } from 'axios';
import { CSSProperties } from 'react';
import { consts } from './config/constants';

/**
 * rounds by 20 because thats height of each div in doc
 */
export const roundHeight = (x: number) => {
  return Math.ceil(x / consts.decoEditor.charHeight) * consts.decoEditor.charHeight;
};

/**
 * get width of given text with temp span
 */
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

/**
 * for only css props intelisense
 */
export const createStyle = <T extends string>(s: Record<T, CSSProperties>) => s;

/**
 * self explanatory
 */
export const showErroNotification = (error: any) => {
  console.log('show notification');

  let errMessage: string;

  if (error instanceof AxiosError) {
    // show label
    console.log('error');
    console.log(error);
    errMessage = error.response?.data?.message || 'unknown error';
  } else {
    errMessage = 'unknown error';
  }

  notification.error({
    message: errMessage,
  });
};

