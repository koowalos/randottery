import React, { useState, useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../../Providers/UserProvider';
import { Form, Input, Row, Col, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { createUserWithEmailAndPasswordHandler } from '../../../firebase';

interface RegisterProps extends RouteComponentProps<any> {
  someProp?: any;
}

const Register: React.FC<RegisterProps> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        form.validateFields(['email']);
        break;
      case 'auth/weak-password':
        form.validateFields(['password']);
        break;

      default:
        break;
    }
  }, [error, form]);

  const userData: any = useContext(UserContext);

  const onFinish = (values) => {
    setLoading(true);
    const succeed = () => {
      setLoading(false);
      console.log('dobre');
    };
    const fail = (error) => {
      setLoading(false);
      setError(error);
    };
    const loginData = {
      email: values.email,
      password: values.password,
    };

    createUserWithEmailAndPasswordHandler(loginData, succeed, fail);
  };

  return (
    <Row justify="center" align="middle" style={{ marginTop: 70 }}>
      <Col span={8}>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
              () => ({
                validator() {
                  if (error.code === 'auth/email-already-in-use') {
                    return Promise.reject(error.message);
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              () => ({
                validator() {
                  if (error.code === 'auth/weak-password') {
                    return Promise.reject(error.message);
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            style={{ textAlign: 'center' }}
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Should accept agreement'),
              },
            ]}
          >
            <Checkbox>I have read the agreement</Checkbox>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
