import { Fragment } from 'react';

export const CustomCursor = ({ color, name }: { color: string; name: string }) => {
  return (
    <Fragment>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: -30,
            backgroundColor: color,
            color: 'black',
            borderRadius: 3,
            margin: 0,
            padding: '2px 5px',
            fontSize: 14,
          }}
        >
          {name}
        </div>

        <div
          style={{
            height: 20,
            width: 2,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </Fragment>
  );
};

