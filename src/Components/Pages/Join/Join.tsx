import React from 'react';
import { Input, Typography, Row, Col, Form, Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

const { Search } = Input;
type JoinProps = RouteComponentProps<any>

const { Title } = Typography;
const Join: React.FC<JoinProps> = props => {
  const { history } = props;
  return (
    <div>
      <Row justify="center">
        <Col span={12}>
          <Title style={{ marginTop: 70, textAlign: 'center' }}>Join existing lottery</Title>
          <Title level={3} style={{ marginTop: 90, textAlign: 'center' }}>
            Insert lottery ID below
          </Title>
        </Col>
      </Row>
      <Row justify="center">
        <Search
          placeholder="Enter lottery ID"
          onSearch={value => history.push(`/join/${value}`)}
          style={{ width: 200, marginTop: 20 }}
        />
      </Row>
      <Form>
        <Form.Item style={{ marginTop: 30, textAlign: 'center' }}>
          <Button
            type="primary"
            htmlType="button"
            danger
            onClick={() => {
              history.goBack();
            }}
          >
            Go back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Join;
