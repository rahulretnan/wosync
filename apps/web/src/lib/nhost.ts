import { NhostClient } from '@nhost/react';
import { NHOST_REGION, NHOST_SUBDOMAIN } from '../config';

export const nhost = new NhostClient({
  subdomain: NHOST_SUBDOMAIN,
  region: NHOST_REGION,
});
