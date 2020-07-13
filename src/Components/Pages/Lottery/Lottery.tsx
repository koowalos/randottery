import React, { useContext } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { Typography, Form, Button } from 'antd';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { joinLottery } from '../../../firebase';
import { UserContext } from '../../../Providers/UserProvider';
import { timestampToDate } from '../../../helpers';

const { Title, Text } = Typography;
interface LotteryProps extends RouteComponentProps<any> {}

const Lottery: React.FC<LotteryProps> = (props) => {
  const { history } = props;
  let { id } = useParams();

  const userData: any = useContext(UserContext);

  const [values, loading, error]: any = useDocument(
    firebase.firestore().doc(`lotteries/${id}`)
  );

  const [form] = Form.useForm();
  console.log(id);

  const onFinish = (values) => {
    joinLottery(id, userData.user.uid);

    console.log('Received values of form: ', values);
  };

  if (error) {
    return <div>ERROR: {error.message}</div>;
  }

  if (loading || !values) {
    return <div>LOADING...</div>;
  }

  console.log(values.data());

  const {
    name,
    prize,
    participants,
    maxParticipants,
    endDate,
    endWhenFull,
  } = values.data();
  const { id: dataId } = values;

  return (
    <div>
      <div className="details-wrapper">
        <Title style={{ marginTop: 70, marginBottom: 5 }}>{name}</Title>
        <Text type="secondary">
          ID: {``}
          {dataId}
        </Text>
        {prize ? (
          <Title level={3} style={{ marginTop: 30 }}>
            Prize to be won: {``} {prize}
          </Title>
        ) : (
          <Title level={3} style={{ marginTop: 30 }}>
            No prize has been set for this lottery
          </Title>
        )}
        <Title level={4} style={{ marginTop: 50 }}>
          Participants: {participants.length}
          {maxParticipants !== 0 ? `/${maxParticipants}` : null}
        </Title>
        <Text type="secondary" style={{ marginTop: 30 }}>
          {endWhenFull
            ? `This lottery will start immediately when maximum number of participants is reached`
            : `This lottery will end on: ${timestampToDate(endDate)}`}
        </Text>
      </div>
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
export default Lottery;
