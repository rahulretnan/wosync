import { Outlet, rootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { HasuraAuthClient } from '@nhost/hasura-auth-js';
import { App, ConfigProvider, theme } from 'antd';
import { useTheme } from '@ui/stores/theme.store';

interface RouteContext {
  auth: HasuraAuthClient;
}

export const rootRoute = rootRouteWithContext<RouteContext>()({
  component: Root,
});

function Root() {
  const { theme: systemTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#219B8E',
        },
        components: {
          Layout: {
            triggerBg: '#219B8E',
            algorithm: true,
          },
        },
        algorithm: [
          // theme.compactAlgorithm,
          systemTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        ],
      }}
    >
      <App>
        <Outlet />
        <TanStackRouterDevtools position={'bottom-right'} />
      </App>
    </ConfigProvider>
  );
}
