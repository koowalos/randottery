import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox, Typography, DatePicker, InputNumber } from 'antd';
import { createLottery } from '../../../firebase';
import { UserContext } from '../../../Providers/UserProvider';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';

const disabledDate = current => {
  return current && current < moment().endOf('day').subtract(1, 'day');
};

type NewProps = RouteComponentProps<any>

const { Title } = Typography;

const New: React.FC<NewProps> = props => {
  const [form] = Form.useForm();
  const { history } = props;
  const userData: any = useContext(UserContext);

  const onFinish = fieldsValue => {
    const endDate = +fieldsValue['endDate'].format('x');
    const values = {
      ...fieldsValue,
      endDate,
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
      userData.user.uid,
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
        form={form}
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
            () => ({
              validator(rule, value) {
                const isValid = value ? !value.isBefore(moment()) : false;
                if (isValid || !value) {
                  return Promise.resolve();
                }
                return Promise.reject('Selected time has elapsed.');
              },
            }),
          ]}
        >
          <DatePicker showTime format="DD-MM-YYYY HH:mm" showNow={false} disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item label="Prize" name="prize" initialValue="">
          <Input placeholder="Enter prize name (optional)" />
        </Form.Item>
        <Form.Item
          label="Maximum number of participants"
          name="maxParticipants"
          help="Leave 0 for unlimited number of participants"
          initialValue={0}
        >
          <InputNumber
            placeholder="Enter maximum number of participants"
            type="number"
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Number of winners"
          name="numberOfWinners"
          initialValue={1}
          rules={[
            {
              type: 'number',
              required: true,
              message: 'This field is required',
            },
            () => ({
              validator(rule, value) {
                const maxParticipants = form.getFieldValue('maxParticipants');
                const isMore = value ? value > maxParticipants : false;
                if (!isMore || maxParticipants === 0) {
                  return Promise.resolve();
                }
                return Promise.reject('Cannot be bigger than number of participants');
              },
            }),
          ]}
        >
          <InputNumber placeholder="Default 1" type="number" min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name="endWhenFull"
          initialValue={false}
          rules={[
            () => ({
              validator(rule, value) {
                const maxParticipants = form.getFieldValue('maxParticipants');
                if (maxParticipants === 0 && value === true) {
                  return Promise.reject('Cannot be selected for unlimited number of participants');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Checkbox defaultChecked={false}>Start immediately with max participants</Checkbox>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            htmlType="button"
            danger
            onClick={() => {
              history.goBack();
            }}
          >
            Go back
          </Button>{' '}
          <Button type="primary" htmlType="submit">
            Create lottery
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default New;
