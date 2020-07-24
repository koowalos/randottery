import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { Typography, Form, Button } from 'antd';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { UserContext } from '../../../Providers/UserProvider';
import { timestampToDate } from '../../../helpers';
import { deleteLottery } from '../../../firebase';

const { Title, Text } = Typography;
interface LotteryProps extends RouteComponentProps<any> {}

const Lottery: React.FC<LotteryProps> = (props) => {
  const userData: any = useContext(UserContext);
  const { history } = props;
  let { id } = useParams();

  const [values, loading, error]: any = useDocument(
    firebase.firestore().doc(`lotteries/${id}`)
  );

  if (error) {
    return <div>ERROR: {error.message}</div>;
  }

  if (loading || !values) {
    return <div>LOADING...</div>;
  }

  if (!values.data()) {
    return <Redirect to="/" />;
  }

  const {
    owner,
    name,
    prize,
    participants,
    maxParticipants,
    endDate,
    endWhenFull,
    status,
    winners,
  } = values.data();

  const renderDelete = () => {
    if (participants.length === 0 && owner === userData.user.uid) {
      return (
        <>
          {' '}
          <Button
            type="primary"
            htmlType="button"
            danger
            onClick={() => {
              deleteLottery(id);
            }}
          >
            Delete
          </Button>
        </>
      );
    }
    return null;
  };

  const sortWinners = (winners) => {
    console.log(winners);
    return winners.map((el) => <div key={el.uid}>{el.displayName}</div>);
  };

  const winnerMessage = () => {
    switch (winners.length) {
      case 0:
        return <div>There were no winners.</div>;
      case 1:
        return <div>The winner is: {sortWinners(winners)}</div>;
      default:
        return <div>The winners are: {sortWinners(winners)}</div>;
    }
  };

  return status === 'ended' ? (
    <div>
      <div className="details-wrapper">
        <Title style={{ marginTop: 70, marginBottom: 5 }}>{name}</Title>
        <Text type="secondary">
          ID: {``}
          {id}
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
          {`This lottery ended on: ${timestampToDate(endDate.seconds)}`}
        </Text>
        <br />
        <Title level={2} style={{ marginTop: 30 }}>
          {winnerMessage()}
        </Title>
      </div>
      <Form>
        <Form.Item style={{ marginTop: 30, textAlign: 'center' }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {
              history.push('/');
            }}
          >
            Go back
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div>
      <div className="details-wrapper">
        <Title style={{ marginTop: 70, marginBottom: 5 }}>{name}</Title>
        <Text type="secondary">
          ID: {``}
          {id}
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
            : `This lottery will end on: ${timestampToDate(endDate.seconds)}`}
        </Text>
      </div>
      <Form>
        <Form.Item style={{ marginTop: 30, textAlign: 'center' }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {
              history.push('/');
            }}
          >
            Go back
          </Button>
          {renderDelete()}
        </Form.Item>
      </Form>
    </div>
  );
};
export default Lottery;
