import React, { Fragment } from 'react';
import { Button, PageHeader, Tag } from 'antd';
import { ReactComponent as Logo } from '../../assets/svg/document.svg';
import { consts, styles } from '../../libs/constants';
import { DatabaseTwoTone, SaveTwoTone } from '@ant-design/icons';

export const Topbar: React.FC = () => {
  const tag = (
    <Fragment>
      <Tag color="blue">5 people active</Tag>
    </Fragment>
  );

  const buttons = [
    <Button key="1" type="default" icon={<DatabaseTwoTone />}>
      Export
    </Button>,
    <Button key="2" type="primary" icon={<SaveTwoTone />}>
      Save
    </Button>,
  ];

  return (
    <PageHeader
      title={consts.title}
      subTitle={consts.subTitle}
      tags={tag}
      style={styles.topBar}
      avatar={{ src: <Logo />, shape: 'square', size: 'large' }}
      extra={buttons}
    />
  );
};

