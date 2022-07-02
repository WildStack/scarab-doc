import { Fragment } from 'react';

export const CustomCursor = () => {
  return (
    <Fragment>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: -30,
            backgroundColor: '#a00000',
            color: 'white',
            borderRadius: 3,
            margin: 0,
            padding: '2px 5px',
            fontSize: 14,
          }}
        >
          atheros aa
        </div>

        <div
          style={{
            height: 20,
            width: 2,
            backgroundColor: '#a00000',
          }}
        ></div>
      </div>
    </Fragment>
  );
};

