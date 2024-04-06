import { getSdk } from './stores.sdk';
import { createHasuraSdk } from '../../lib/hasura';

type GetSdk = typeof getSdk;

export const storeSdk = createHasuraSdk(getSdk) as ReturnType<GetSdk>;
