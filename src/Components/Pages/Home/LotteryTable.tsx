import React from 'react';
import { Table, Button, message } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { timestampToDate } from '../../../helpers';
import copy from 'copy-text-to-clipboard';

interface LotteryTableProps extends RouteComponentProps<any> {
  data?: Array<{
    key: string;
    name: string;
    id: string;
    participants: string;
    endDate: {
      seconds: number;
      nanoseconds: number;
    };
  }>;
}

const LotteryTable: React.FC<LotteryTableProps> = props => {
  const { history, data } = props;

  const columns = [
    { title: 'Name', dataIndex: 'name', width: 300 },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 78,
      render: id => (
        <Button
          size="small"
          onClick={() => {
            copy(window.location.origin + '/#/join/' + id);
            message.success('Copied lottery URL to clipboard', 1);
          }}
        >
          Copy URL
        </Button>
      ),
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      width: 92,
      render: (text, row) => {
        const { participants, maxParticipants } = row;

        return (
          <span>
            {participants.length}
            {maxParticipants !== 0 ? `/${maxParticipants}` : null}
          </span>
        );
      },
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      width: 225,
      render: endDate => timestampToDate(endDate.seconds),
    },
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
      <Table size="small" scroll={{ x: 'auto' }} pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default withRouter(LotteryTable);
