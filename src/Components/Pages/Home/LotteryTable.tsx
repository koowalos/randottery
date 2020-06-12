import React from 'react';
import { Table, Button, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';
const copy = require('copy-text-to-clipboard');

// interface LotteryTableProps extends RouteComponentProps<any> {
//   /* Parent component's props*/
// }

interface LotteryTableProps {}

const LotteryTable: React.FC<LotteryTableProps> = (props) => {
  // const { history } = props;
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 78,
      render: (id) => (
        <Button
          size="small"
          onClick={() => {
            copy(window.location.origin + '/#/join/' + id);
            message.success(`Copied lottery URL to clipboard`, 1);
          }}
        >
          Copy ID
        </Button>
      ),
    },
    { title: 'Participants', dataIndex: 'participants', width: 92 },
    { title: 'End date', dataIndex: 'endDate', width: 125 },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, row) => (
        <Button
          onClick={() => {
            // history.push(`/lottery/${row.id}`);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  const id_1 = uuidv4();
  const id_2 = uuidv4();
  const data = [
    {
      key: id_1,
      name: 'John Brown',
      id: id_1,
      participants: '34/65',
      endDate: moment().format('DD/MM/YYYY HH:MM'),
    },
    {
      key: id_2,
      name: 'John Brown',
      id: id_2,
      participants: '34/65',
      endDate: moment().format('DD/MM/YYYY HH:MM'),
    },
  ];

  return (
    <div>
      <Table
        size="small"
        scroll={{ x: 'auto' }}
        pagination={false}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default LotteryTable;
