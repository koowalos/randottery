import React from 'react';
import { Input, Typography, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
interface JoinProps {
  someProp?: any;
}

const { Title } = Typography;
const Join: React.FC<JoinProps> = (props) => {
  return (
    <div>
      <Row justify="center">
        <Col span={12}>
          <Title style={{ marginTop: 70, textAlign: 'center' }}>
            Join existing lottery
          </Title>
          <Title level={3} style={{ marginTop: 90, textAlign: 'center' }}>
            Insert lottery ID below
          </Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={6}>
          <Input
            size="large"
            placeholder="Lottery ID"
            style={{ marginTop: 30 }}
          />
        </Col>
        <Col span={1}>
          <Button
            size="large"
            shape="circle"
            icon={<SearchOutlined />}
            style={{ marginTop: 30, marginLeft: 10 }}
          />
        </Col>
      </Row>
    </div>
  );
};
export default Join;
