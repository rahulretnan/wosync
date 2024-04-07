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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
