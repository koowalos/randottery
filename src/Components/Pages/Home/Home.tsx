import React, { useContext } from 'react';
import { Tabs, Row, Col, Button, Typography } from 'antd';
import LotteryTable from './LotteryTable';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../../Providers/UserProvider';
import { LotteryContext } from '../../../Providers/LotteryProvider';

const { TabPane } = Tabs;
const { Title } = Typography;

interface HomeProps extends RouteComponentProps<any> {
  /* Parent component's props*/
}

const Home: React.FC<HomeProps> = (props) => {
  const userData: any = useContext(UserContext);
  const lotteriesData: any = useContext(LotteryContext);

  if (lotteriesData.error) {
    return <div>ERROR: {lotteriesData.error.message}</div>;
  }

  if (lotteriesData.loading || !lotteriesData.lotteries) {
    return <div>LOADING...</div>;
  }

  const joinedActive = lotteriesData.lotteries.filter(
    (o) => o.status === 'active' && o.owner !== userData.user.uid
  );
  const joinedEnded = lotteriesData.lotteries.filter(
    (o) =>
      (o.status === 'ended' || o.status === 'cancelled') &&
      o.owner !== userData.user.uid
  );
  const myActive = lotteriesData.lotteries.filter(
    (o) => o.status === 'active' && o.owner === userData.user.uid
  );
  const myEnded = lotteriesData.lotteries.filter(
    (o) =>
      (o.status === 'ended' || o.status === 'cancelled') &&
      o.owner === userData.user.uid
  );

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
          >
            <TabPane
              tab={
                <>
                  Active{' '}
                  <span style={{ color: '#ccc' }}>({joinedActive.length})</span>
                </>
              }
              key="1"
            >
              <LotteryTable data={joinedActive} />
            </TabPane>
            <TabPane
              tab={
                <>
                  Ended{' '}
                  <span style={{ color: '#ccc' }}>({joinedEnded.length})</span>
                </>
              }
              key="2"
            >
              <LotteryTable data={joinedEnded} />
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
          >
            <TabPane
              tab={
                <>
                  Active{' '}
                  <span style={{ color: '#ccc' }}>({myActive.length})</span>
                </>
              }
              key="1"
            >
              <LotteryTable data={myActive} />
            </TabPane>
            <TabPane
              tab={
                <>
                  Ended{' '}
                  <span style={{ color: '#ccc' }}>({myEnded.length})</span>
                </>
              }
              key="2"
            >
              <LotteryTable data={myEnded} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
