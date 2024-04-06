import * as Types from '../../generated/base-types';

import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoresQueryVariables = Types.Exact<{ [key: string]: never }>;

export type StoresQuery = {
  __typename?: 'query_root';
  stores: Array<{
    __typename?: 'stores';
    id: any;
    name: string;
    website_url: string;
    created_at: any;
    updated_at: any;
  }>;
};

export type CreateStoreMutationVariables = Types.Exact<{
  object?: Types.InputMaybe<Types.Stores_Insert_Input>;
}>;

export type CreateStoreMutation = {
  __typename?: 'mutation_root';
  insertStore?: { __typename?: 'stores'; id: any } | null;
};

export const StoresDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stores' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stores' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website_url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useStoresQuery__
 *
 * To run a query within a React component, call `useStoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoresQuery({
 *   variables: {
 *   },
 * });
 */
export function useStoresQuery(
  baseOptions?: Apollo.QueryHookOptions<StoresQuery, StoresQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StoresQuery, StoresQueryVariables>(
    StoresDocument,
    options,
  );
}
export function useStoresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StoresQuery, StoresQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StoresQuery, StoresQueryVariables>(
    StoresDocument,
    options,
  );
}
export function useStoresSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    StoresQuery,
    StoresQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<StoresQuery, StoresQueryVariables>(
    StoresDocument,
    options,
  );
}
export type StoresQueryHookResult = ReturnType<typeof useStoresQuery>;
export type StoresLazyQueryHookResult = ReturnType<typeof useStoresLazyQuery>;
export type StoresSuspenseQueryHookResult = ReturnType<
  typeof useStoresSuspenseQuery
>;
export type StoresQueryResult = Apollo.QueryResult<
  StoresQuery,
  StoresQueryVariables
>;
export const CreateStoreDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createStore' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'object' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'stores_insert_input' },
          },
          defaultValue: { kind: 'ObjectValue', fields: [] },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insertStore' },
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
export type CreateStoreMutationFn = Apollo.MutationFunction<
  CreateStoreMutation,
  CreateStoreMutationVariables
>;

/**
 * __useCreateStoreMutation__
 *
 * To run a mutation, you first call `useCreateStoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoreMutation, { data, loading, error }] = useCreateStoreMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateStoreMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateStoreMutation,
    CreateStoreMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateStoreMutation, CreateStoreMutationVariables>(
    CreateStoreDocument,
    options,
  );
}
export type CreateStoreMutationHookResult = ReturnType<
  typeof useCreateStoreMutation
>;
export type CreateStoreMutationResult =
  Apollo.MutationResult<CreateStoreMutation>;
export type CreateStoreMutationOptions = Apollo.BaseMutationOptions<
  CreateStoreMutation,
  CreateStoreMutationVariables
>;
