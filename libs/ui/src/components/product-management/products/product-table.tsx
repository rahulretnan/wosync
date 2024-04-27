import React from 'react';
import Table from '../../custom-table/table';
import { Link } from '@tanstack/react-router';
import { Button, Dropdown, TableProps, Tooltip, Typography } from 'antd';
import { LinkOutlined, MoreOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@shared/constants/date/date-format';
import relativeTime from 'dayjs/plugin/relativeTime';
import useAntd from '../../../hooks/use-antd';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';

dayjs.extend(relativeTime);

const AddProductButton = ({ storeId }: { storeId: string }) => {
  return (
    <Link
      to={`/stores/$storeId/product-management`}
      params={{
        storeId,
      }}
      search={{
        activeTab: 'add-product',
      }}
    >
      <Button type="primary">Add Product</Button>
    </Link>
  );
};

interface ProductTableProps {
  showLess?: boolean;
  storeId: string;
}

const ProductTable = ({ storeId, showLess = false }: ProductTableProps) => {
  const { modal } = useAntd();
  // const { data, loading } = useProductsQuery({
  //   fetchPolicy: 'network-only',
  // });
  const columns: TableProps<any>['columns'] = [
    {
      title: 'Product Name',
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
                label: 'Delete Product',
                key: 'delete-product',
                danger: true,
                icon: <TrashIcon className="size-4" />,
                onClick: () =>
                  modal.confirm({
                    title: 'Are you sure to delete this product?',
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
      dataSource={[]}
      columns={columns}
      loading={false}
      rowKey={(record) => record.id}
      customHeight={'h-[calc(100vh-425px)]'}
      tableHeaderProps={{
        searchProps: {
          placeholder: 'Search by name',
          showSearch: true,
        },
        title: 'Products',
        extra: <AddProductButton storeId={storeId} />,
      }}
      emptyText="No Products Available"
    />
  );
};

export default ProductTable;
