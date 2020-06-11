import React from 'react';
import { Table, Button, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
const copy = require('copy-text-to-clipboard');

interface LotteryTableProps {
  someProp?: any;
}

const LotteryTable: React.FC<LotteryTableProps> = (props) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: '1' },
    {
      title: 'ID',
      dataIndex: 'id',
      key: '2',
      width: 100,
      render: (id) => (
        <Button
          onClick={() => {
            copy(id);
            message.success(`Copied ${id} to clipboard`, 0.5);
          }}
        >
          Copy ID
        </Button>
      ),
    },
    { title: 'Participants', dataIndex: 'participants', width: 92, key: '3' },
    { title: 'End date', dataIndex: 'endDate', width: 125, key: '4' },
    { title: 'Action', render: (text) => <Button>DETAILS</Button> },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      id: uuidv4(),
      participants: '34/65',
      endDate: moment().format('DD/MM/YYYY HH:MM'),
      address: 'New York Park',
    },
    {
      key: '1',
      name: 'John Brown',
      id: uuidv4(),
      participants: '34/65',
      endDate: moment().format('DD/MM/YYYY HH:MM'),
      address: 'New York Park',
    },
  ];

  return (
    <div>
      <Table
        scroll={{ x: 'auto' }}
        pagination={false}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default LotteryTable;
