/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gaxios } from 'gaxios';
import { ASTNode, print } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { RequestConfig, Variables } from 'graphql-request/build/esm/types';
import { get, isEmpty } from 'lodash';

export interface HasuraQueryDTO {
  query: ASTNode;
  variables: Variables;
  path?: string;
}

export class HasuraService {
  clientHasuraGQL: GraphQLClient;
  clientHasura: Gaxios;

  constructor(endpoint: string, options: RequestConfig = {}) {
    const gqlEndPoint = `${endpoint}/v1/graphql`;

    this.clientHasura = new Gaxios({
      baseURL: endpoint,
      headers: options.headers,
    });
    this.clientHasuraGQL = new GraphQLClient(gqlEndPoint, options);
  }

  async query({ query, variables, path }: HasuraQueryDTO) {
    const data = await this.clientHasuraGQL.request(print(query), variables);
    return !isEmpty(path) ? get(data, `${path}`) : data;
  }

  /**
   * Send request to Hasura metadata API
   * @see https://hasura.io/docs/latest/graphql/core/api-reference/metadata-api/index.html#metadata-apis
   */
  async metadataApi(query: any) {
    const { data } = await this.clientHasura.request({
      method: 'POST',
      url: '/v1/metadata',
      data: query,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  }

  /**
   * Send request to Hasura schema API
   * @see https://hasura.io/docs/latest/graphql/core/api-reference/schema-api/
   */
  async schemaApi(query: any) {
    const { data } = await this.clientHasura.request({
      method: 'POST',
      url: '/v2/query',
      data: query,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  }

  async runSQL(sqlQuery: string) {
    return await this.schemaApi({
      type: 'run_sql',
      args: {
        sql: sqlQuery,
      },
    });
  }

  async createScheduledEvent(
    id: string,
    webhook: string,
    schedule_at: string,
    payload: any,
    retry_conf?: any,
  ) {
    // set default retry config
    if (!retry_conf) {
      retry_conf = {
        num_retries: 3,
        timeout_seconds: 120,
        tolerance_seconds: 21675,
        retry_interval_seconds: 12,
      };
    }

    const response = await this.metadataApi({
      type: 'create_scheduled_event',
      args: {
        webhook,
        schedule_at,
        payload: payload,
        retry_conf,
        comment: id,
      },
    });

    console.log({
      info: 'Event Scheduled',
      webhook,
      schedule_at,
      payload: payload,
      retry_conf,
      comment: id,
      response,
    });
    return response;
  }

  /**
   * Delete scheduled events by comment
   *
   * @param comment - Comment string
   */
  async deleteScheduledEvent(comment: string) {
    const sql = `delete from hdb_catalog.hdb_scheduled_events where comment='${comment}'`;

    const response = await this.schemaApi({
      type: 'run_sql',
      args: { sql },
    });

    console.log({
      info: 'Scheduled Event Deleted',
      comment,
      response,
    });
    return response;
  }
  createCronEvent(
    cornName: string,
    webhook: string,
    cronSchedule: string,
    payload: any,
  ) {
    return this.metadataApi({
      type: 'create_cron_trigger',
      args: {
        name: cornName,
        webhook,
        schedule: cronSchedule,
        payload,
        include_in_metadata: false,
        source: 'default',
        headers: [],
        retry_conf: {
          num_retries: 0,
          retry_interval_seconds: 10,
          timeout_seconds: 60,
        },
        comment: null,
        replace: false,
      },
    });
  }

  deleteCronEvent(cornName: string) {
    return this.metadataApi({
      type: 'delete_cron_trigger',
      args: {
        source: 'default',
        name: cornName,
      },
    });
  }
}

export enum HasuraEventOperations {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  MANUAL = 'MANUAL',
}
