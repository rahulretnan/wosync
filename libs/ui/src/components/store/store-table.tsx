import React from 'react';
import Table from '../../components/custom-table/table';
import { Link } from '@tanstack/react-router';
import { Button, Dropdown, TableProps, Tooltip, Typography } from 'antd';
import { Stores } from '../../graphql/stores/index';
import { useStoresQuery } from '../../graphql/stores/stores.generated';
import { LinkOutlined, MoreOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@shared/constants/date/date-format';
import relativeTime from 'dayjs/plugin/relativeTime';
import useAntd from '../../hooks/use-antd';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';

dayjs.extend(relativeTime);

const AddStoreButton = () => {
  return (
    <Link to="/stores/create">
      <Button type="primary">Add Store</Button>
    </Link>
  );
};

interface StoreTableProps {
  showLess?: boolean;
}

const StoreTable = ({ showLess = false }: StoreTableProps) => {
  const { modal } = useAntd();
  const { data, loading } = useStoresQuery({
    fetchPolicy: 'network-only',
  });
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
    {
      dataIndex: 'id',
      key: 'actions',
      render: (value) => (
        <Dropdown
          arrow
          menu={{
            items: [
              {
                label: 'View Details',
                key: 'view-details',
                icon: <EyeIcon className="size-4" />,
              },
              {
                label: 'Delete Store',
                key: 'delete-store',
                danger: true,
                icon: <TrashIcon className="size-4" />,
                onClick: () =>
                  modal.confirm({
                    title: 'Are you sure to delete this store?',
                    okType: 'danger',
                    okText: 'Delete',
                  }),
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
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
