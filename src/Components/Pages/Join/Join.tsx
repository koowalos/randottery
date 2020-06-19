import React from 'react';
import { Input, Typography, Row, Col } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

const { Search } = Input;
interface JoinProps extends RouteComponentProps<any> {}

const { Title } = Typography;
const Join: React.FC<JoinProps> = (props) => {
  const { history } = props;
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
        <Search
          placeholder="Enter lottery ID"
          onSearch={(value) => history.push(`/join/${value}`)}
          style={{ width: 200, marginTop: 20 }}
        />
      </Row>
    </div>
  );
};
export default Join;
