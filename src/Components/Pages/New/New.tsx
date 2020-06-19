import React from 'react';
import { Form, Input, Button, Switch, Typography, DatePicker } from 'antd';

interface NewProps {
  someProp?: any;
}

const { Title } = Typography;

const New: React.FC<NewProps> = (props) => {
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      dateTimePicker: fieldsValue['dateTimePicker'].format(
        'YYYY-MM-DD HH:mm:ss'
      ),
    };
    console.log('Received values of form: ', values);
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
          name="dateTimePicker"
          label="End date"
          rules={[
            { type: 'object', required: true, message: 'Please select time!' },
          ]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item label="Prize">
          <Input placeholder="Enter prize name (optional)" />
        </Form.Item>
        <Form.Item label="Number of winners">
          <Input placeholder="Default 1" />
        </Form.Item>
        <Form.Item label="Additional unique keyword">
          <Input placeholder="Optional" />
        </Form.Item>
        <Form.Item>
          <Switch style={{ marginRight: 16 }} />
          Start immediately with max participants
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
