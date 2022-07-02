// TypeScript users only add this code
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export enum DocEditorType {
  PARAGRAPH = 'paragraph',
  CODE = 'code',
}

type CustomText = {
  text: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: {
      type: DocEditorType;
      children: CustomText[];
    };
    Text: CustomText;
  }
}