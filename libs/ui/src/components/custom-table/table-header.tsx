import React, { FC, ReactNode } from 'react';
import type { SelectProps } from 'antd';
import { Flex, Select, Typography } from 'antd';

export type TableHeaderProps = {
  showSearch?: boolean;
  searchProps?: SelectProps;
  extra?: ReactNode;
  title?: string;
};
const TableHeader: FC<TableHeaderProps> = ({
  searchProps,
  showSearch = true,
  extra,
  title,
}) => {
  return (
    <div className="p-2">
      <Typography.Title level={5}>{title}</Typography.Title>
      <Flex align="center" justify="space-between">
        {showSearch ? (
          <Select {...searchProps} showSearch style={{ width: 300 }} />
        ) : null}
        <div>{extra}</div>
      </Flex>
    </div>
  );
};

export default TableHeader;
