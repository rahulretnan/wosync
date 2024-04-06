import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { HasuraAuthClient } from '@nhost/hasura-auth-js';
import { APP_ENV } from '@ui/config';
import PageNotFound from './__404';
import ThemeProvider from '@ui/components/theme-provider';

interface RouteContext {
  auth: HasuraAuthClient;
}

export const rootRoute = createRootRouteWithContext<RouteContext>()({
  component: Root,
  notFoundComponent: PageNotFound,
});

export function Root() {
  return (
    <ThemeProvider>
      <Outlet />
      {APP_ENV === 'development' ? (
        <TanStackRouterDevtools position={'bottom-right'} />
      ) : null}
    </ThemeProvider>
  );
}
