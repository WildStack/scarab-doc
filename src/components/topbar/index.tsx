import React from 'react';
import { PageHeader } from 'antd';
import { ReactComponent as Logo } from '../../assets/svg/document.svg';
import { consts } from '../../common/config/constants';
import { styles } from '../../common/config/styles';

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

