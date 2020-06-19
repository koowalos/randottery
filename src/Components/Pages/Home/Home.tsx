import React from 'react';
import { Tabs, Row, Col, Button, Typography } from 'antd';
import LotteryTable from './LotteryTable';
import { RouteComponentProps } from 'react-router-dom';
import { useGetFetch } from '../../../Hooks/fetch';

const { TabPane } = Tabs;
const { Title } = Typography;

interface HomeProps extends RouteComponentProps<any> {
  /* Parent component's props*/
}
function callback(key) {
  console.log(key);
}

const Home: React.FC<HomeProps> = (props) => {
  const request = useGetFetch(
    'https://api.jsonbin.io/b/5ee40dde655d87580c4914d9/latest'
  );

  const { loading, error, done, response } = request;

  if (error) {
    return <div>ERROR: {error.message}</div>;
  }

  if (loading || !done) {
    return <div>LOADING...</div>;
  }

  const { data } = response;
  console.log(data);

  return (
    <div>
      <Row justify="space-around" gutter={16}>
        <Col xs={24} sm={24}>
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
              <LotteryTable
                data={data.filter(
                  (o) => o.status === 'active' && o.ownerId !== '666'
                )}
              />
            </TabPane>
            <TabPane tab="Ended" key="2">
              <LotteryTable
                data={data.filter(
                  (o) =>
                    (o.status === 'ended' || o.status === 'canceled') &&
                    o.ownerId !== '666'
                )}
              />
            </TabPane>
          </Tabs>
        </Col>
        <Col xs={24} sm={24}>
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
              <LotteryTable
                data={data.filter(
                  (o) => o.status === 'active' && o.ownerId === '666'
                )}
              />
            </TabPane>
            <TabPane tab="Ended" key="2">
              <LotteryTable
                data={data.filter(
                  (o) =>
                    (o.status === 'ended' || o.status === 'canceled') &&
                    o.ownerId === '666'
                )}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
