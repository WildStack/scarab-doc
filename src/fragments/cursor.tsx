import React, { Fragment } from 'react';
import { styles } from '../common/config/styles';

interface CustomCursorProps {
  color: string;
  name: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = props => {
  return (
    <Fragment>
      <div style={{ position: 'relative' }}>
        <div style={{ backgroundColor: props.color, ...styles.cursor }}>{props.name}</div>
        <div style={{ height: 20, width: 2, backgroundColor: props.color }} />
      </div>
    </Fragment>
  );
};

