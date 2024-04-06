import { createRoute, Link } from '@tanstack/react-router';
import { authRoute } from '../_authenticated';
import Table from '@ui/components/custom-table/table';
import { Button, TableProps, Tooltip, Typography } from 'antd';
import { Stores, useStoresQuery } from '@ui/graphql/stores';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DATE_TIME_FORMAT } from '@shared/constants/date/date-format';
import { LinkOutlined } from '@ant-design/icons';

dayjs.extend(relativeTime);

export const storesRoute = createRoute({
  path: '/stores',
  component: StoresList,
  getParentRoute: () => authRoute,
});

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

function StoresList() {
  const { data, loading } = useStoresQuery({
    fetchPolicy: 'network-only',
  });
  return (
    <div className="h-full w-full p-5">
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
    </div>
  );
}
