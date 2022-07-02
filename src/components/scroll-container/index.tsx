import React, { ReactNode } from 'react';
import { consts } from '../../libs/constants';

export const ScrollContainer: React.FC<{ children: ReactNode }> = props => {
  //TODO monitor body height
  return (
    <div
      className="custom-scrollbar"
      style={{
        maxHeight: document.body.scrollHeight - consts.topBar.height - consts.spacer.height,
        overflowY: 'auto',
      }}
    >
      {props.children}
    </div>
  );
};

