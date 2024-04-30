import React from 'react';
import { consts } from '../common/config/constants';
import { styles } from '../common/config/styles';
import { PageHeader } from 'antd';
import url from '../assets/beastz.png';

export const Topbar: React.FC = () => {
  return (
    <PageHeader
      title={consts.title}
      subTitle={consts.subTitle}
      style={styles.topBar}
      avatar={{ src: <img src={url} />, shape: 'square', size: 'large' }}
    />
  );
};
