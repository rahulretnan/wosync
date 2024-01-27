import React, { memo } from 'react';

import { Flex, Layout } from 'antd';
import { createRoute, Outlet } from '@tanstack/react-router';
import { rootRoute } from './__root';
import Sidebar from '@ui/components/layout/sidebar';
import Header from '@ui/components/layout/header';
import Footer from '@ui/components/layout/footer';

const { Content } = Layout;

export const appLayoutRoute = createRoute({
  id: 'app-layout',
  component: memo(AppLayout),
  getParentRoute: () => rootRoute,
});

function AppLayout() {
  return (
    <Flex>
      <Layout className="min-h-screen">
        <Sidebar menu />
        <Layout>
          <Header />
          <Content className="mr-3 rounded-xl p-5">
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Flex>
  );
}
