import { getSdk } from './integrations.sdk';
import { createHasuraSdk } from '../../lib/hasura';

type GetSdk = typeof getSdk;

export const integrationSdk = createHasuraSdk(getSdk) as ReturnType<GetSdk>;
