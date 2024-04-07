import { createRoute } from '@tanstack/react-router';
import { authRoute } from '../_authenticated';
import { Card, Steps } from 'antd';
import React, { useState } from 'react';
import { ProductOutlined, ShopOutlined } from '@ant-design/icons';
import CreateStoreForm from '@ui/components/store/create-store-form';
import ConnectIntegrationButton from '@ui/components/store/connect-integration-button';

export const createStoreRoute = createRoute({
  path: '/stores/create',
  component: CreateStore,
  getParentRoute: () => authRoute,
});

function CreateStore() {
  const [current, setCurrent] = useState<number>(0);
  const [store, setStore] = useState<{
    id: string;
    website: string;
    name: string;
  }>();
  const stepItems = [
    {
      title: 'Create Store',
      icon: <ShopOutlined />,
      content: <CreateStoreForm setCurrent={setCurrent} setStore={setStore} />,
    },
    {
      title: 'Connect Store Integration',
      icon: <ProductOutlined />,
      content: (
        <ConnectIntegrationButton setCurrent={setCurrent} store={store} />
      ),
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
