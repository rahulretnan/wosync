import { getSdk } from './logs.sdk';
import { createHasuraSdk } from '../../lib/hasura';

type GetSdk = typeof getSdk;

export const logSdk = createHasuraSdk(getSdk) as ReturnType<GetSdk>;
