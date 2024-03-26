import React from 'react';
import { Layout } from 'antd';
import { createRoute, Outlet, redirect } from '@tanstack/react-router';
import { rootRoute } from './__root';
import Footer from '@ui/components/layout/footer';

const { Content } = Layout;

export const authLayoutRoute = createRoute({
  id: 'auth-layout',
  component: AuthLayout,
  getParentRoute: () => rootRoute,
  beforeLoad: async ({ location, context }) => {
    const { isAuthenticated, isLoading } =
      context.auth.getAuthenticationStatus();
    if (isAuthenticated && !isLoading) {
      throw redirect({
        to: '/',
        search: location.search,
      });
    }
  },
  wrapInSuspense: true,
});

function AuthLayout() {
  return (
    <Layout className="h-dvh">
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}
