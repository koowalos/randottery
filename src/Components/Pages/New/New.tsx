import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox, Typography, DatePicker } from 'antd';
import { createLottery } from '../../../firebase';
import { UserContext } from '../../../Providers/UserProvider';

interface NewProps {
  someProp?: any;
}

const { Title } = Typography;

const New: React.FC<NewProps> = (props) => {
  const user: any = useContext(UserContext);

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      endDate: fieldsValue['endDate'].format('YYYY-MM-DD HH:mm:ss'),
    };

    createLottery(
      {
        name: values.lotteryName,
        maxParticipants: +values.maxParticipants,
        endDate: values.endDate,
        endWhenFull: values.endWhenFull,
        numberOfWinners: +values.numberOfWinners,
        prize: values.prize,
      },
      user.uid
    );
  };

  return (
    <div>
      <Title
        style={{
          marginTop: 70,
          textAlign: 'center',
        }}
      >
        Create new lottery
      </Title>
      <Form
        name="timeRelatedControls"
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 400,
          margin: 'auto',
          marginTop: 70,
        }}
      >
        <Form.Item
          label="Lottery name"
          name="lotteryName"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter lottery name!',
            },
          ]}
        >
          <Input placeholder="Enter lottery name" />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End date"
          rules={[
            { type: 'object', required: true, message: 'Please select time!' },
          ]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item label="Prize" name="prize">
          <Input placeholder="Enter prize name (optional)" />
        </Form.Item>
        <Form.Item label="Number of participants" name="maxParticipants">
          <Input
            placeholder="Enter maximum number of participants"
            type="number"
          />
        </Form.Item>
        <Form.Item label="Number of winners" name="numberOfWinners">
          <Input placeholder="Default 1" type="number" />
        </Form.Item>
        {/* <Form.Item label="Additional unique keyword" name="additional">
          <Input placeholder="Optional" />
        </Form.Item> */}
        <Form.Item valuePropName="checked" name="endWhenFull">
          <Checkbox defaultChecked={false}>
            Start immediately with max participants
          </Checkbox>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Create lottery
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default New;
