import * as Types from '../base-types';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import { DocumentNode } from 'graphql';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type CheckWebsiteExistQueryVariables = Types.Exact<{
  url?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type CheckWebsiteExistQuery = {
  __typename?: 'query_root';
  stores: Array<{ __typename?: 'stores'; id: any; website_url: string }>;
};

export type UpdateStoreMutationVariables = Types.Exact<{
  id: Types.Scalars['uuid']['input'];
  _set?: Types.InputMaybe<Types.Stores_Set_Input>;
}>;

export type UpdateStoreMutation = {
  __typename?: 'mutation_root';
  updateStore?: { __typename?: 'stores'; id: any } | null;
};

export const CheckWebsiteExistDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'checkWebsiteExist' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'url' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          defaultValue: { kind: 'StringValue', value: '%%', block: false },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stores' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'website_url' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_ilike' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'url' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'website_url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const UpdateStoreDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateStore' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_set' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'stores_set_input' },
          },
          defaultValue: { kind: 'ObjectValue', fields: [] },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateStore' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_set' },
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
    checkWebsiteExist(
      variables?: CheckWebsiteExistQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CheckWebsiteExistQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CheckWebsiteExistQuery>(
            CheckWebsiteExistDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'checkWebsiteExist',
        'query',
        variables,
      );
    },
    updateStore(
      variables: UpdateStoreMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdateStoreMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateStoreMutation>(UpdateStoreDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'updateStore',
        'mutation',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
