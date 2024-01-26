import { ParsedLocation, redirect } from '@tanstack/react-router';
import { HasuraAuthClient } from '@nhost/hasura-auth-js';

interface Context {
  auth: HasuraAuthClient;
}

interface beforeLoadArg {
  location: ParsedLocation;
  context: Context;
}

export const checkAuth: (args: beforeLoadArg) => Promise<void> = async ({
  location,
  context,
}) => {
  const isAuthenticated = context.auth.isAuthenticated();
  if (!isAuthenticated) {
    throw redirect({
      to: '/signin',
      search: {
        redirect: location.href,
      },
    });
  }
};
