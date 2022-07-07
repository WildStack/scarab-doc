import { ReactEditor } from 'slate-react';

export enum DocEditorType {
  PARAGRAPH = 'paragraph',
  CODE = 'code',
}

type CustomText = {
  text: string;
  children?: CustomText[];
};

declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor;
    Element: {
      type: DocEditorType;
      children: CustomText[];
    };
    Text: CustomText;
  }
}

