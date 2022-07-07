import { Button, Form, Input } from 'antd';
import { useInjection } from 'inversify-react';
import React from 'react';
import { AuthController } from './auth.controller';

export const Auth: React.FC = () => {
  const authController = useInjection(AuthController);

  const onFinish = (values: { username: string }) => {
    authController.authenticate(values.username);
  };

  return (
    <div
      style={{
        maxWidth: 700,
        backgroundColor: 'white',
        padding: 20,
        margin: '200px auto',
        display: 'flex',
      }}
    >
      <Form
        style={{ flex: 1 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          label="Username"
          name="username"
          tooltip="აუცილებელი ველია"
          rules={[{ required: true, message: 'აუცილებელი ველია !' }]}
        >
          <Input tabIndex={1} placeholder="გთხოვთ შეიყვანოთ თქვენი Username" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            წავედით
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

