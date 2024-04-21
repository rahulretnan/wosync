import * as Types from '../base-types';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import { DocumentNode } from 'graphql';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type AddIntegrationMutationVariables = Types.Exact<{
  object: Types.Integrations_Insert_Input;
}>;

export type AddIntegrationMutation = {
  __typename?: 'mutation_root';
  insertIntegration?: { __typename?: 'integrations'; id: any } | null;
};

export type GetIntegrationByStoreIdQueryVariables = Types.Exact<{
  store_id: Types.Scalars['uuid']['input'];
}>;

export type GetIntegrationByStoreIdQuery = {
  __typename?: 'query_root';
  integrations: Array<{
    __typename?: 'integrations';
    id: any;
    integration_type: string;
    metadata: any;
    store: {
      __typename?: 'stores';
      name: string;
      user_id: any;
      website_url: string;
      id: any;
    };
  }>;
};

export const AddIntegrationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addIntegration' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'object' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'integrations_insert_input' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertIntegration' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'object' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'object' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const GetIntegrationByStoreIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getIntegrationByStoreId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'store_id' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'integrations' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'store_id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'store_id' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'integration_type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'StringValue',
                              value: 'WOOCOMMERCE',
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'integration_type' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'store' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'website_url' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    addIntegration(
      variables: AddIntegrationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AddIntegrationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddIntegrationMutation>(
            AddIntegrationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'addIntegration',
        'mutation',
        variables,
      );
    },
    getIntegrationByStoreId(
      variables: GetIntegrationByStoreIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetIntegrationByStoreIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetIntegrationByStoreIdQuery>(
            GetIntegrationByStoreIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getIntegrationByStoreId',
        'query',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
