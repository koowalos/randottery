import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetFetch } from '../../../Hooks/fetch';
import { Typography, Form, Input, Button } from 'antd';
const { Title, Text } = Typography;
interface JoinDetailsProps {
  someProp?: any;
}

const JoinDetails: React.FC<JoinDetailsProps> = (props) => {
  let { id } = useParams();
  const [form] = Form.useForm();
  console.log(id);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const request = useGetFetch(
    'https://api.jsonbin.io/b/5eecfcd5e2ce6e3b2c75ba27/latest'
  );

  const { loading, error, done, response } = request;

  if (error) {
    return <div>ERROR: {error.message}</div>;
  }

  if (loading || !done) {
    return <div>LOADING...</div>;
  }

  const { data } = response;
  const {
    name,
    id: dataId,
    prize,
    participants,
    maxParticipants,
    endDate,
    endWhenFull,
  } = data;

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
          Participants: {participants}/{maxParticipants}
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
        <Form.Item
          name="displayName"
          rules={[
            {
              required: true,
              message: 'Please input your Name',
            },
          ]}
        >
          <Input placeholder="Displayed Name" />
        </Form.Item>

        <Form.Item
          name="uniqueName"
          rules={[
            {
              required: true,
              message: 'Please input your Unique Name',
            },
          ]}
        >
          <Input placeholder="Unique name" />
        </Form.Item>

        <Button block type="primary" htmlType="submit">
          JOIN
        </Button>
      </Form>
      {/* 
      <pre>{JSON.stringify(response?.data, null, 2)}</pre> */}
    </div>
  );
};
export default JoinDetails;
