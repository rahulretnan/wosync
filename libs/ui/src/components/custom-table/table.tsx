import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  Empty,
  ListProps,
  Table as AntdTable,
  TableProps,
  Typography,
} from 'antd';
import type { Key, SortOrder } from 'antd/lib/table/interface';
import { LoadingOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import type { TableHeaderProps } from './table-header';
import TableHeader from './table-header';

type CustomTableProps<RecordType> = Omit<TableProps<RecordType>, 'title'> & {
  emptyText?: string;
  customEmpty?: ReactNode;
  showNormalHeight?: boolean;
  setSort?: Dispatch<SetStateAction<Sorter>>;
  listRenderItem?: ListProps<RecordType>['renderItem'];
  tableHeaderProps?: TableHeaderProps;
  customHeight?: string;
};

export type Sorter = {
  order: SortOrder;
  columnKey: Key;
};

function Table<RecordType extends object>({
  emptyText,
  customEmpty,
  loading = false,
  listRenderItem,
  showNormalHeight = false,
  setSort,
  columns,
  tableHeaderProps,
  customHeight,
  ...props
}: CustomTableProps<RecordType>) {
  return (
    <AntdTable
      {...props}
      title={
        tableHeaderProps
          ? () => <TableHeader {...tableHeaderProps} />
          : undefined
      }
      columns={columns}
      size={props.size ?? 'small'}
      pagination={{
        position: ['bottomCenter'],
        hideOnSinglePage: true,
        showSizeChanger: false,
        size: 'small',
        pageSize: 15,
        showTotal: (total, [start, end]) =>
          `${start} - ${end} of ${total} items`,
        ...props.pagination,
      }}
      loading={{
        spinning: loading as boolean,
        indicator: (
          <LoadingOutlined
            style={{ fontSize: 30 }}
            spin
            data-test-id="table-loading"
          />
        ),
        className: 'h-full',
      }}
      locale={{
        emptyText: customEmpty || (
          <div
            className={`${
              showNormalHeight
                ? 'h-96'
                : customHeight
                  ? customHeight
                  : 'h-[calc(100vh-340px)]'
            } grid place-content-center ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Empty
              description={
                <Typography.Text className="text-base">
                  {emptyText || 'No Data Available'}
                </Typography.Text>
              }
            />
          </div>
        ),
      }}
      onChange={(_pagination, _filters, sorter) => {
        if (setSort && !isEmpty(sorter))
          setSort({
            order: (sorter as Sorter).order,
            columnKey: (sorter as Sorter).columnKey,
          });
      }}
    />
  );
}

export default Table;
