import React from 'react';
import { consts } from '../common/config/constants';
import { styles } from '../common/config/styles';
import { PageHeader } from 'antd';
import { ReactComponent as Logo } from '../assets/svg/document.svg';

export const Topbar: React.FC = () => {
  return (
    <PageHeader
      title={consts.title}
      subTitle={consts.subTitle}
      style={styles.topBar}
      avatar={{ src: <Logo />, shape: 'square', size: 'large' }}
    />
  );
};
