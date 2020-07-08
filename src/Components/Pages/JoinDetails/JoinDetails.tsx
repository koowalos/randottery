import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Form, Input, Button } from 'antd';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { joinLottery } from '../../../firebase';
import { UserContext } from '../../../Providers/UserProvider';

const { Title, Text } = Typography;
interface JoinDetailsProps {
  someProp?: any;
}

const JoinDetails: React.FC<JoinDetailsProps> = (props) => {
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
            : `This lottery will end on: ${endDate}`}
        </Text>
      </div>
      <Form
        style={{ maxWidth: 400, margin: 'auto', marginTop: 30 }}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Button block type="primary" htmlType="submit">
          JOIN
        </Button>
      </Form>
    </div>
  );
};
export default JoinDetails;
