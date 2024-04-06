import * as Types from '../base-types';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import { DocumentNode } from 'graphql';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type AddActivityLogMutationVariables = Types.Exact<{
  object?: Types.InputMaybe<Types.Activity_Logs_Insert_Input>;
}>;

export type AddActivityLogMutation = {
  __typename?: 'mutation_root';
  insertActivityLog?: { __typename?: 'activity_logs'; id: any } | null;
};

export const AddActivityLogDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addActivityLog' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'object' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'activity_logs_insert_input' },
          },
          defaultValue: { kind: 'ObjectValue', fields: [] },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertActivityLog' },
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
    addActivityLog(
      variables?: AddActivityLogMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AddActivityLogMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddActivityLogMutation>(
            AddActivityLogDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'addActivityLog',
        'mutation',
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
