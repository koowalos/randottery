import React, { useContext } from 'react';
import { Tabs, Row, Col, Button, Typography } from 'antd';
import LotteryTable from './LotteryTable';
import { RouteComponentProps } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../../../firebase';
import { UserContext } from '../../../Providers/UserProvider';

const { TabPane } = Tabs;
const { Title } = Typography;

interface HomeProps extends RouteComponentProps<any> {
  /* Parent component's props*/
}
function callback(key) {
  console.log(key);
}

const Home: React.FC<HomeProps> = (props) => {
  const userData: any = useContext(UserContext);

  const [myLotteries, myLoading, myError] = useCollection(
    firestore.collection('lotteries').where('owner', '==', userData.user.uid)
  );

  const [joinedLotteries, joinedLoading, joinedError] = useCollection(
    firestore
      .collection('lotteries')
      .where('participants', 'array-contains', userData.user.uid)
  );

  if (myError) {
    return <div>ERROR: {myError.message}</div>;
  }
  if (joinedError) {
    return <div>ERROR: {joinedError.message}</div>;
  }

  if (myLoading || !myLotteries) {
    return <div>LOADING...</div>;
  }

  if (joinedLoading || !joinedLotteries) {
    return <div>LOADING...</div>;
  }

  const myData: any = [];
  const joinedData: any = [];

  myLotteries.docs.map((doc) => {
    myData.push({ ...doc.data(), key: doc.id, id: doc.id });
  });

  joinedLotteries.docs.map((doc) => {
    joinedData.push({ ...doc.data(), key: doc.id, id: doc.id });
  });

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
                data={joinedData.filter((o) => o.status === 'active')}
              />
            </TabPane>
            <TabPane tab="Ended" key="2">
              <LotteryTable
                data={joinedData.filter(
                  (o) => o.status === 'ended' || o.status === 'cancelled'
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
                data={myData.filter((o) => o.status === 'active')}
              />
            </TabPane>
            <TabPane tab="Ended" key="2">
              <LotteryTable
                data={myData.filter(
                  (o) => o.status === 'ended' || o.status === 'cancelled'
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
