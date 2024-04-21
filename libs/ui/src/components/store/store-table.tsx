import React from 'react';
import Table from '@ui/components/custom-table/table';
import { Link } from '@tanstack/react-router';
import { Button, TableProps, Tooltip, Typography } from 'antd';
import { Stores } from '../../graphql/stores/index';
import { useStoresQuery } from '../../graphql/stores/stores.generated';
import { LinkOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@shared/constants/date/date-format';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const AddStoreButton = () => {
  return (
    <Link to="/stores/create">
      <Button type="primary">Add Store</Button>
    </Link>
  );
};

const columns: TableProps<Stores>['columns'] = [
  {
    title: 'Store Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Website',
    dataIndex: 'website_url',
    key: 'website_url',
    render: (value) => (
      <Link
        to={value}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-1 items-center"
      >
        <LinkOutlined /> {value}
      </Link>
    ),
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    responsive: ['md'],
    className: 'cursor-pointer',
    render: (value) => (
      <Tooltip title={dayjs(value).format(DATE_TIME_FORMAT)}>
        <Typography.Text>{dayjs(value).fromNow()}</Typography.Text>
      </Tooltip>
    ),
  },
];

interface StoreTableProps {
  showLess?: boolean;
}

const StoreTable = ({ showLess = false }: StoreTableProps) => {
  const { data, loading } = useStoresQuery({
    fetchPolicy: 'network-only',
  });
  return (
    <Table
      dataSource={data?.stores ?? []}
      columns={columns}
      loading={loading}
      rowKey={(record) => record.id}
      tableHeaderProps={{
        searchProps: {
          placeholder: 'Search by name',
          showSearch: true,
        },
        title: 'Stores',
        extra: <AddStoreButton />,
      }}
      emptyText="No Stores Available"
    />
  );
};

export default StoreTable;
