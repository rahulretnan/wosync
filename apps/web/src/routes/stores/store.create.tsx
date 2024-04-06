import { createRoute } from '@tanstack/react-router';
import { authRoute } from '../_authenticated';
import { Card, Steps } from 'antd';
import React, { useState } from 'react';
import { ProductOutlined, ShopOutlined } from '@ant-design/icons';
import CreateStoreForm from '@ui/components/store/create-store-form';
import ConnectIntegrationForm from '@ui/components/store/connect-integration-form';

export const createStoreRoute = createRoute({
  path: '/stores/create',
  component: CreateStore,
  getParentRoute: () => authRoute,
});

function CreateStore() {
  const [current, setCurrent] = useState(1);
  const stepItems = [
    {
      title: 'Create Store',
      icon: <ShopOutlined />,
      content: <CreateStoreForm setCurrent={setCurrent} />,
    },
    {
      title: 'Connect Store Integration',
      icon: <ProductOutlined />,
      content: <ConnectIntegrationForm setCurrent={setCurrent} />,
    },
  ];
  const items = stepItems.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));
  return (
    <Card title="Add a new Store">
      <Steps items={items} current={current} />
      {stepItems[current].content}
    </Card>
  );
}
