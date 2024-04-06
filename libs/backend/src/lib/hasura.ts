import { GraphQLClient } from 'graphql-request';
import { HasuraService } from './hasura-service';

export type GetSdk = (client: GraphQLClient) => unknown;

const config = {
  hasuraEndPoint: (process.env['NHOST_HASURA_URL'] as string).replace(
    '/console',
    '',
  ),
  hasuraAdminSecret: process.env['HASURA_GRAPHQL_ADMIN_SECRET'] as string,
};

export const hasura = new HasuraService(config.hasuraEndPoint, {
  headers: {
    'x-hasura-admin-secret': config.hasuraAdminSecret,
  },
});

export const createHasuraSdk = (getSdk: GetSdk) =>
  getSdk(hasura.clientHasuraGQL);

export type createHasuraReturn = ReturnType<typeof createHasuraSdk>;
