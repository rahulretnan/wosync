import React, { memo, useMemo } from 'react';

import { Layout } from 'antd';
import { createRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';
import Sidebar from '@ui/components/layout/sidebar';
import Header from '@ui/components/layout/header';
import Footer from '@ui/components/layout/footer';
import {
  ChartBarIcon,
  Cog8ToothIcon,
  HomeModernIcon,
  RectangleGroupIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserGroupIcon,
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
  const navigate = useNavigate();
  const { isLoading } = useAuthenticationStatus();
  const { storeId } = useCurrentStore();
  const menu = useMemo(
    () => [
      {
        key: '/',
        label: 'Dashboard',
        icon: <ChartBarIcon className="size-5" />,
        onClick: () =>
          navigate({
            to: '/',
          }),
      },
      ...(storeId
        ? [
            {
              key: `/stores/${storeId}/order-management`,
              label: 'Order Management',
              icon: <ShoppingCartIcon className="size-5" />,
              onClick: () =>
                navigate({
                  to: '/stores/$storeId/order-management',
                  params: {
                    storeId: storeId as string,
                  },
                }),
            },
            {
              key: `/stores/${storeId}/product-management`,
              label: 'Product Management',
              icon: <RectangleGroupIcon className="size-5" />,
              onClick: () =>
                navigate({
                  to: '/stores/$storeId/product-management',
                  params: {
                    storeId: storeId as string,
                  },
                }),
            },
            {
              key: `/stores/${storeId}/inventory-management`,
              label: 'Inventory Management',
              icon: <HomeModernIcon className="size-5" />,
              onClick: () =>
                navigate({
                  to: '/stores/$storeId/inventory-management',
                  params: {
                    storeId: storeId as string,
                  },
                }),
            },
            {
              key: `/stores/${storeId}/customer-management`,
              label: 'Customer Management',
              icon: <UserGroupIcon className="size-5" />,
              onClick: () =>
                navigate({
                  to: '/stores/$storeId/customer-management',
                  params: {
                    storeId: storeId as string,
                  },
                }),
            },
            {
              key: `/stores/${storeId}/supplier-management`,
              label: 'Supplier Management',
              icon: <TruckIcon className="size-5" />,
              onClick: () =>
                navigate({
                  to: '/stores/$storeId/supplier-management',
                  params: {
                    storeId: storeId as string,
                  },
                }),
            },
          ]
        : []),
      {
        key: '/settings',
        label: 'Settings',
        icon: <Cog8ToothIcon className="size-5" />,
      },
    ],
    [navigate, storeId],
  );
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
