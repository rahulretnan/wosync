import { Response } from 'express';
import { log } from './logger';
import { ClientError } from 'graphql-request';
import { GaxiosError } from 'gaxios';
import { ZodError } from 'zod';
import { HasuraEventOperations } from './hasura-service';

export type JsonResponseBody<T = Record<string, unknown>> = T;
export const formatResponse = <T = Record<string, unknown>>(
  res: Response,
  body: JsonResponseBody<T>,
  statusCode = 200,
) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.status(statusCode);
  res.send(body);
};

export const handleError = (res: Response, error: unknown) => {
  log(error);
  let message = 'Something went wrong';
  let code: unknown = 'Error';
  if (error instanceof ClientError) {
    message =
      error?.response?.errors && error?.response?.errors.length > 0
        ? error?.response?.errors[0]?.message
        : message;
    code =
      error?.response?.errors && error?.response?.errors.length > 0
        ? error?.response?.errors[0]?.extensions['code']
        : code;
  } else if (error instanceof GaxiosError) {
    message = error?.response?.data?.message ?? message;
    code = 'GaxiosError';
  } else if (error instanceof ZodError) {
    message = error?.errors?.map((e) => e.message).join(', ');
    code = 'ZodError';
  } else {
    message = (error as Error)?.message ?? message;
  }

  formatResponse(
    res,
    {
      message,
      extensions: {
        code,
      },
    },
    400,
  );
};

export interface InputValidationBody<T = Record<string, unknown>> {
  version: string;
  role: string;
  session_variables: Record<string, string>;
  data: {
    input: [JsonResponseBody<T>];
  };
}

export interface EventPayload<T = Record<string, unknown>> {
  created_at: string;
  delivery_info: {
    current_retry: number;
    max_retries: number;
  };
  event: {
    data: {
      new: JsonResponseBody<T>;
      old: JsonResponseBody<T> | null;
    };
    op: HasuraEventOperations;
    session_variables: Record<string, string>;
    trace_context: {
      sampling_state: string;
      span_id: string;
      trace_id: string;
    };
  };
  id: string;
  table: {
    name: string;
    schema: string;
  };
  trigger: {
    name: string;
  };
}
