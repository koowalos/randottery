import React from 'react';
import { Tabs, Row, Col, Button } from 'antd';

const { TabPane } = Tabs;
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
      <Row>
        <Col span={12}>
          <h1>Participate</h1>
          <Button
            onClick={() => {
              props.history.push('/join');
            }}
          >
            JOIN
          </Button>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="In progress" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Ended" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </Col>
        <Col span={12}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="In progress" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Ended" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
