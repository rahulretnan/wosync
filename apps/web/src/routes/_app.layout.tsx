import React, { memo } from 'react';

import { Layout } from 'antd';
import { createRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';
import Sidebar from '@ui/components/layout/sidebar';
import Header from '@ui/components/layout/header';
import Footer from '@ui/components/layout/footer';
import {
  BuildingStorefrontIcon,
  Cog8ToothIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { useAuthenticationStatus } from '@nhost/react';
import Loader from '@ui/components/utilities/loader';
import { useCurrentStore } from '@ui/hooks/useCurrentStore';

const { Content } = Layout;

export const appLayoutRoute = createRoute({
  id: 'app-layout',
  component: memo(AppLayout),
  getParentRoute: () => rootRoute,
});

export function AppLayout() {
  const { currentView } = useCurrentStore();
  const navigate = useNavigate();
  const { isLoading } = useAuthenticationStatus();
  const menu = [
    {
      key: '/',
      label: 'Dashboard',
      icon: <HomeIcon className="size-5" />,
      onClick: () =>
        navigate({
          to: '/',
        }),
    },
    ...(currentView === 'ALL'
      ? [
          {
            key: '/stores',
            label: 'Stores',
            icon: <BuildingStorefrontIcon className="size-5" />,
            onClick: () => navigate({ to: '/stores' }),
          },
        ]
      : []),
    {
      key: '/settings',
      label: 'Settings',
      icon: <Cog8ToothIcon className="size-5" />,
    },
  ];
  return (
    <Loader
      loading={isLoading}
      children={
        <Layout className="h-dvh">
          <Sidebar menu={menu} />
          <Layout>
            <Header />
            <Content className="mr-3 rounded-xl p-5">
              <Outlet />
            </Content>
            <Footer />
          </Layout>
        </Layout>
      }
    />
  );
}
