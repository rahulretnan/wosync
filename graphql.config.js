const dotenv = require('dotenv');

const production = {};
dotenv.config({
  path: './services/hasura/cli/.env.production',
  processEnv: production,
});

const development = {};
dotenv.config({
  path: './services/hasura/cli/.env.development',
  processEnv: development,
});

module.exports = {
  schema: [
    {
      [`${production['HASURA_GRAPHQL_ENDPOINT']}/v1/graphql`]: {
        headers: {
          'x-hasura-admin-secret': production['HASURA_GRAPHQL_ADMIN_SECRET'],
        },
      },
    },
    {
      [`${development['HASURA_GRAPHQL_ENDPOINT']}/v1/graphql`]: {
        headers: {
          'x-hasura-admin-secret': development['HASURA_GRAPHQL_ADMIN_SECRET'],
        },
      },
    },
  ],
};
