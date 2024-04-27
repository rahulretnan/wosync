import { createRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { authRoute } from '../../../_authenticated';
import { decryptParam, encryptParam } from '@ui/utils/path';

dayjs.extend(relativeTime);

export const storesInventoryManagementRoute = createRoute({
  path: '/stores/$storeId/inventory-management',
  component: InventoryManagementPage,
  getParentRoute: () => authRoute,
  stringifyParams: (params) => ({
    storeId: encryptParam(params.storeId),
  }),
  parseParams: (rawParams) => ({
    storeId: decryptParam(rawParams.storeId),
  }),
});

function InventoryManagementPage() {
  const { storeId } = storesInventoryManagementRoute.useParams();
  return <div className="h-full w-full p-5">Hello</div>;
}
