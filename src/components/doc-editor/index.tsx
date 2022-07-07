export const x = 1;
// import { notification } from 'antd';
// import { useInjection } from 'inversify-react';
// import { toJS } from 'mobx';
// import { observer } from 'mobx-react';
// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { createEditor, Descendant, Editor, Operation, Transforms } from 'slate';
// import { withReact, Slate, Editable, ReactEditor, DefaultElement } from 'slate-react';
// import { roundHeight } from '../../common';
// import { consts } from '../../common/config/constants';
// import { styles } from '../../common/config/styles';
// import getSocketInstance from '../../common/socket';
// import { DocDataDtoNotifyEnum } from '../../models/enums/doc-data-notify.enum';
// import { DocDataDtoNotify } from '../../models/socket/notify-update';
// import { DocSession } from '../../models/state/doc-session';
// import { User } from '../../models/state/user';
// import { AuthState } from '../auth/auth.state';
// import { DocEditorType } from './declares';
// import { DocEditorController } from './doc-editor.controller';
// import { DocEditorState } from './doc-editor.state';

// export const DocEditor: React.FC = observer(() => {
//   // slate editor
//   const [editor] = useState(() => withReact(createEditor()));

//   // state
//   const docEditorController = useInjection(DocEditorController);
//   const docEditorState = useInjection(DocEditorState);
//   const authState = useInjection(AuthState);

//   const getCurrentNode = useCallback(() => {
//     const pageNumber = editor.selection?.anchor.path[0];
//     const pageOffset = editor.selection?.anchor.offset;

//     if (pageNumber !== undefined && pageOffset !== undefined) {
//       const element = editor.children.at(pageNumber);

//       if (element !== undefined) {
//         return {
//           pageNumber,
//           pageOffset,
//           element,
//         };
//       }
//     }

//     return null;
//   }, [editor.children, editor.selection?.anchor.offset, editor.selection?.anchor.path]);

//   const replaceNode = (at: number, newText?: string) => {
//     let path = at >= editor.children.length ? at - 1 : at;

//     Transforms.removeNodes(editor, { at: { path: [path, 0], offset: 0 } });
//     Transforms.insertNodes(
//       editor,
//       {
//         type: DocEditorType.PARAGRAPH,
//         children: [{ text: newText || '' }],
//       },
//       { at: [path] }
//     );
//   };

//   //TODO separate request on enter and (copy/paste) cause slate react sucks and dont have much time
//   const onEditableKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//     }
//   };

//   const onSlateChange = async (value: Descendant[]) => {
//     const operations = editor.operations;
//     const isAstChange = operations.some(op => !Operation.isSelectionOperation(op));

//     if (isAstChange) {
//       docEditorState.docSession = {
//         ...docEditorState.docSession,
//         content: JSON.stringify(value),
//       };

//       await docEditorController.saveContent(value);

//       //!
//       console.log('sent');

//       const currentNode = getCurrentNode();
//       docEditorController.updateNotify(
//         currentNode?.element,
//         DocDataDtoNotifyEnum.SINGLE_LINE,
//         authState.user.uuid,
//         currentNode?.pageNumber
//       );
//     }

//     // if (isAstChange) {
//     //   if (
//     //     operations.length === 1 &&
//     //     (operations.at(0)?.type === 'remove_text' || operations.at(0)?.type === 'insert_text')
//     //   ) {
//     //     const currentNode = getCurrentNode();

//     //     // distribute update single line
//     //     docEditorController.updateNotify(
//     //       currentNode?.element,
//     //       DocDataDtoNotifyEnum.SINGLE_LINE,
//     //       authState.user.uuid,
//     //       currentNode?.pageNumber
//     //     );
//     //   } else {
//     //     // distribute whole update
//     //     docEditorController.updateNotify(value, DocDataDtoNotifyEnum.WHOLE, authState.user.uuid);
//     //   }
//     // }
//   };

//   useEffect(() => {
//     const socket = getSocketInstance();
//     socket.connect();

//     socket.on('user_removed', (res: User) => {
//       console.log('user_removed');
//     });
//     socket.on('user_added', (res: User) => {
//       console.log('user_added');
//     });
//     socket.on('notify_update', (res: DocDataDtoNotify) => {
//       if (res.uuid === authState.user.uuid) {
//         return;
//       }

//       console.log(res);

//       //!
//       // const newText = (JSON.parse(res.content) as Descendant).children?.at(0)?.text || '';
//       // replaceNode(res.pageNumber ?? 0, newText);

//       if (res.type === DocDataDtoNotifyEnum.SINGLE_LINE) {
//         // docEditorState.docSession.content
//         const newText = (JSON.parse(res.content) as Descendant).children?.at(0)?.text || '';

//         replaceNode(res.pageNumber ?? 0, newText);
//       }

//       // update in state
//       docEditorState.docSession = {
//         ...docEditorState.docSession,
//         content: res.content,
//       };

//       // if (res.type === DocDataDtoNotifyEnum.WHOLE) {
//       //   console.log('RERENDER');
//       //   // reRender();
//       // }

//       // console.log('wassup');
//     });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

// // const currentNodePosition
// useEffect(() => {
// const interval = setInterval(() => {
//   const currentElement = getCurrentNode()?.element;
//   if (!currentElement) return;
//   const currentDom = ReactEditor.toDOMNode(editor, currentElement);
//   const editorDom = ReactEditor.toDOMNode(editor, editor);
//   const currentDomClient = currentDom.getBoundingClientRect();
//   // calculate y
//   const y =
//     currentDomClient.top + currentDomClient.height / 2 - editorDom.getBoundingClientRect().top;
//   // calculate x
//   const caretPosOffset = window.getSelection()?.getRangeAt(0).startOffset || 0;
//   const x = getWidthOfText(currentDom.innerText.slice(0, caretPosOffset));
//   console.log({
//     x,
//     y: roundHeight(y) - consts.decoEditor.charHeight,
//   });
// }, 1500);
// return () => clearInterval(interval);
// }, [editor, getCurrentNode]);

//   return (
//     <Slate editor={editor} value={docEditorState.getDocContent} onChange={onSlateChange}>
//       {/* {docEditorState.docSession.content} */}
//       <Editable onKeyDown={onEditableKeyDown} style={styles.docEditorEditable} />
//     </Slate>
//   );
// });

// //  onKeyUp={event => {
// //         //! replaces node
// //         if (event.key === '/') {
// //           replaceNode(7, 'new text');
// //         }

// //         //! insert node at the and of line
// //         if (event.key === '=') {
// //           insertNode();
// //         }

// //         //! removes whole node
// //         if (event.key === '-') {
// //           removeNode();
// //         }
// //       }}

// // onKeyUp={event => {
// //   // if (event.key === '&') {
// //   //   // Prevent the ampersand character from being inserted.
// //   //   event.preventDefault();
// //   //   // Execute the `insertText` method when the event occurs.
// //   //   editor.insertText('and');
// //   // }

// //   // if (event.key === '7') {
// //   //   Transforms.insertText(editor, '2asdas', {
// //   //     at: { path: [3, 0], offset: 0 },
// //   //   });
// //   // }
// //   // if (event.key === 'Backspace') {
// //   //   Transforms.delete(editor, {
// //   //     at: { path: [3, 0], offset: offset },
// //   //   });
// //   // }
// //   // console.log(getCurrentNode());
// //   // replaceNode(7, text);
// //   const currentNode = getCurrentNode();
// //   // console.log('-------------------key up');
// //   // console.log(currentNode);
// //   // console.log(currentNode?.element.children?.at(0));
// //   // console.log('-------------------');

// //   if (event.key === '/') {
// //     replaceNode(7, 'new text');
// //   }

// //   //! insert node at the and of line
// //   if (event.key === '=') {
// //     insertNode();
// //   }

// //   //! removes whole node
// //   if (event.key === '-') {
// //     removeNode();
// //   }

// // }}

// // const insertNode = () => {
// //   Transforms.insertNodes(
// //     editor,
// //     {
// //       type: DocEditorType.PARAGRAPH,
// //       children: [{ text: 'aaaaaaaaaaa' + randomIntFromInterval(0, 100) }],
// //     },
// //     { at: [editor.children.length] }
// //   );
// // };

// // const removeNode = () => {
// //   Transforms.removeNodes(editor, { at: [editor.children.length - 1] });
// // };

// // at the end of line
// // Transforms.removeNodes(editor, { at: { path: [editor.children.length - 1, 0], offset: 0 } });
// // Transforms.insertNodes(
// //   editor,
// //   {
// //     type: DocEditorType.PARAGRAPH,
// //     children: [{ text: randomIntFromInterval(0, 100).toString() }],
// //   },
// //   { at: [editor.children.length] }

// // );

// // function randomIntFromInterval(min: number, max: number) {
// //   // min and max included
// //   return Math.floor(Math.random() * (max - min + 1) + min);

// // }

