import React, { useState, useContext } from 'react';
import { Link, RouteComponentProps, Redirect } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPasswordHandler } from '../../../firebase';
import { UserContext } from '../../../Providers/UserProvider';
interface SignInProps extends RouteComponentProps<any> {
  someProp?: any;
}

const SignIn: React.FC<SignInProps> = (props) => {
  const userData: any = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    const succeed = () => {
      setLoading(false);
      console.log('dobre');
    };
    const fail = () => {
      setLoading(false);
      console.log('zle');
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
      <Col span={4}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/password-reset">Forgot password</Link>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="login-form-button"
              type="primary"
              loading={loading}
            >
              Log in
            </Button>{' '}
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignIn;
