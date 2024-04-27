import { createRoute, useNavigate } from '@tanstack/react-router';
import { Button, Layout, Result } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ThemeProvider from '@ui/components/theme-provider';
import React from 'react';
import { authRoute } from '../../../../_authenticated';
import { useCurrentStore } from '@ui/hooks/useCurrentStore';

dayjs.extend(relativeTime);

export const storesIntegrationSuccessRoute = createRoute({
  path: '/stores/$storeId/integration/success',
  component: IntegrationSuccessPage,
  getParentRoute: () => authRoute,
});

function IntegrationSuccessPage() {
  const navigate = useNavigate();
  const params: { success: number; user_id: string } =
    storesIntegrationSuccessRoute.useSearch();
  const { setStoreId, setCurrentView } = useCurrentStore();
  return (
    <ThemeProvider>
      <Layout className="flex h-dvh w-full items-center justify-center">
        <Result
          status="success"
          title="Successfully Connect Woocommerce App"
          extra={
            <Button
              type="primary"
              onClick={async () => {
                setStoreId(params?.user_id);
                setCurrentView('STORE');
                await navigate({
                  to: '/',
                });
              }}
            >
              Go to Store Dashboard
            </Button>
          }
        />
      </Layout>
    </ThemeProvider>
  );
}
