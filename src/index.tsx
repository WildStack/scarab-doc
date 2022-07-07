import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'inversify-react';
import { IocContainer } from './common/ioc/container';

import 'antd/dist/antd.css';
import './assets/css/index.css';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <Provider container={IocContainer.getContainer()}>
    <App />
  </Provider>
  // <React.StrictMode>
  //   <Provider container={IocContainer.getContainer()}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>
);

