import type { CodegenConfig } from '@graphql-codegen/cli';

const hasuraGraphQLEndpoint: string | undefined =
  process.env['HASURA_GRAPHQL_ENDPOINT'];
const hasuraGraphqlAdminSecret: string | undefined =
  process.env['HASURA_GRAPHQL_ADMIN_SECRET'];

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`${hasuraGraphQLEndpoint}/v1/graphql`]: {
        headers: {
          'x-hasura-admin-secret': hasuraGraphqlAdminSecret as string,
        },
      },
    },
  ],

  generates: {
    // 'libs/shared-backend/src/sdk/base-types.ts': {
    //   documents: 'libs/shared-backend/src/sdk/graphql/**/*.graphql',
    //   plugins: ['typescript'],
    //   config: {
    //     documentMode: 'documentNode',
    //   },
    // },
    // 'libs/shared-backend/src/sdk': {
    //   documents: 'libs/shared-backend/src/sdk/graphql/**/*.graphql',
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.sdk.ts',
    //     baseTypesPath: 'base-types.ts',
    //   },
    //   plugins: ['typescript-operations', 'typescript-graphql-request'],
    //   config: {
    //     documentMode: 'documentNode',
    //   },
    // },

    // Shared frontend SDK
    'libs/ui/src/generated/base-types.ts': {
      documents: 'libs/ui/**/**/*.graphql',
      config: {
        documentMode: 'documentNode',
      },
      plugins: ['typescript'],
    },
    'libs/ui': {
      documents: 'libs/ui/**/**/*.graphql',
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'src/generated/base-types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        documentMode: 'documentNode',
        withHooks: true,
      },
    },
    // 'services/hasura/metadata/query_collections.yaml': {
    //   documents: ['apps/**/**/*.graphql', 'libs/**/**/*.graphql'],
    //   plugins: ['hasura-allow-list'],
    // },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write '**/*.{js,jsx,ts,tsx}'"],
  },
};

export default config;
