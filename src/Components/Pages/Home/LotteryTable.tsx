import React from 'react';
import { Table, Button, message } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const copy = require('copy-text-to-clipboard');

interface LotteryTableProps extends RouteComponentProps<any> {
  data?: Array<{
    key: string;
    name: string;
    id: string;
    participants: string;
    endDate: string;
  }>;
}

const LotteryTable: React.FC<LotteryTableProps> = (props) => {
  const { history, data } = props;

  const columns = [
    { title: 'Name', dataIndex: 'name', width: 300 },
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
    {
      title: 'Participants',
      dataIndex: 'participants',
      width: 92,
      render: (text, row) => {
        if (typeof row.participants === 'number') {
          return (
            <span>
              {row.participants}/{row.maxParticipants}
            </span>
          );
        }
        return (
          <span>
            {row.participants.length}/{row.maxParticipants}
          </span>
        );
      },
    },
    { title: 'End date', dataIndex: 'endDate', width: 225 },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, row) => (
        <Button
          onClick={() => {
            history.push(`/lottery/${row.id}`);
          }}
        >
          Details
        </Button>
      ),
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

export default withRouter(LotteryTable);
