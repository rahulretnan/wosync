import { Outlet, rootRouteWithContext } from '@tanstack/react-router';
import { HasuraAuthClient } from '@nhost/hasura-auth-js';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RouteContext {
  auth: HasuraAuthClient;
}

export const Route = rootRouteWithContext<RouteContext>()({
  component: () => (
    <div data-theme="light" className="min-h-screen">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
