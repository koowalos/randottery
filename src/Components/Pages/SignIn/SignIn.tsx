import React, { useState, useContext, useEffect } from 'react';
import { Link, RouteComponentProps, Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPasswordHandler } from '../../../firebase';
import { UserContext } from '../../../Providers/UserProvider';
interface SignInProps extends RouteComponentProps<any> {
  someProp?: any;
}

const SignIn: React.FC<SignInProps> = (props) => {
  const [form] = Form.useForm();
  const userData: any = useContext(UserContext);
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    switch (error.code) {
      case 'auth/user-not-found':
        form.validateFields(['email']);
        break;
      default:
        break;
    }
  }, [error, form]);

  const [loading, setLoading] = useState(false);
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

    signInWithEmailAndPasswordHandler(loginData, succeed, fail);
  };
  if (userData.user) {
    return <Redirect to="/" />;
  }
  return (
    <Row justify="space-around" align="middle" style={{ marginTop: 70 }}>
      <Col span={24}>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ margin: 'auto', maxWidth: 420 }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },

              () => ({
                validator() {
                  if (error.code === 'auth/user-not-found') {
                    return Promise.reject('User not found!');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail "
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Link to="/password-reset">Forgot password</Link>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Button
              htmlType="submit"
              className="login-form-button"
              type="primary"
              loading={loading}
            >
              Log in
            </Button>
            <div>
              Or <Link to="/register">register now!</Link>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignIn;
