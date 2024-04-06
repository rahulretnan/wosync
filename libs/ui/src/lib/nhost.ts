import { NhostClient } from '@nhost/react';
import { NHOST_REGION, NHOST_SUBDOMAIN } from '../config';
import { InMemoryCache } from '@apollo/client/core';

export const nhost = new NhostClient({
  subdomain: NHOST_SUBDOMAIN,
  region: NHOST_REGION,
  clientStorage: localStorage,
});

export const cache = new InMemoryCache();
