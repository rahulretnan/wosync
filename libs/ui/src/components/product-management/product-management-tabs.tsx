import React from 'react';
import { Card, Tabs, TabsProps } from 'antd';
import ProductTable from './products/product-table';
import { useNavigate } from '@tanstack/react-router';

interface ProductManagementTabsProps {
  storeId?: string;
  searchParams?: { activeTab: string };
}

const ProductManagementTabs = ({
  storeId,
  searchParams,
}: ProductManagementTabsProps) => {
  const navigate = useNavigate();
  const items: TabsProps['items'] = [
    {
      key: 'products',
      label: 'Products',
      children: <ProductTable storeId={storeId as string} />,
    },
    {
      key: 'add-product',
      label: 'Add Product',
      children: 'Content of Tab Pane 2',
    },
    {
      key: 'product-categories',
      label: 'Categories',
      children: 'Content of Tab Pane 3',
    },
    {
      key: 'product-tags',
      label: 'Tags',
      children: 'Content of Tab Pane 3',
    },
    {
      key: 'product-attributes',
      label: 'Attributes',
      children: 'Content of Tab Pane 3',
    },
    {
      key: 'product-reviews',
      label: 'Reviews',
      children: 'Content of Tab Pane 3',
    },
  ];
  return (
    <Card>
      <Tabs
        activeKey={searchParams?.activeTab || 'products'}
        defaultActiveKey={'products'}
        items={items}
        onChange={async (key) =>
          await navigate({
            to: `/stores/$storeId/product-management`,
            params: {
              storeId,
            },
            search: {
              activeTab: key,
            },
          })
        }
      ></Tabs>
    </Card>
  );
};

export default ProductManagementTabs;
