import React from 'react';
import { Tabs, Row, Col, Button, Typography } from 'antd';
import LotteryTable from './LotteryTable';

const { TabPane } = Tabs;
const { Title } = Typography;

interface HomeProps {
  history: {
    push: Function;
  };
}
function callback(key) {
  console.log(key);
}

const Home: React.FC<HomeProps> = (props) => {
  console.log(props);

  return (
    <div>
      <Row justify="space-around" gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Title level={4}>Lotteries you are participating in</Title>
          <Tabs
            tabBarExtraContent={
              <Button
                onClick={() => {
                  props.history.push('/join');
                }}
              >
                Join
              </Button>
            }
            defaultActiveKey="1"
            onChange={callback}
          >
            <TabPane tab="In progress" key="1">
              <LotteryTable />
            </TabPane>
            <TabPane tab="Ended" key="2">
              <LotteryTable />
            </TabPane>
          </Tabs>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Title level={4}>Your current lotteries</Title>
          <Tabs
            tabBarExtraContent={
              <Button
                onClick={() => {
                  props.history.push('/new');
                }}
              >
                Create
              </Button>
            }
            defaultActiveKey="1"
            onChange={callback}
          >
            <TabPane tab="In progress" key="1">
              <LotteryTable />
            </TabPane>
            <TabPane tab="Ended" key="2">
              <LotteryTable />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
