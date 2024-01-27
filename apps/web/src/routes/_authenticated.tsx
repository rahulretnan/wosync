import { createRoute, Navigate, Outlet } from '@tanstack/react-router';
import { appLayoutRoute } from './_app.layout';
import Loader from '@ui/components/utilities/loader';
import { useAuthenticationStatus } from '@nhost/react';

export const authRoute = createRoute({
  id: 'auth',
  component: Auth,
  getParentRoute: () => appLayoutRoute,
});

function Auth() {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  return (
    <Loader
      loading={isLoading}
      children={
        isAuthenticated ? <Outlet /> : <Navigate to={'/signin'} replace />
      }
    />
  );
}
