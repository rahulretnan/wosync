import { createRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { authRoute } from '../../../_authenticated';

dayjs.extend(relativeTime);

export const storesInventoryManagementRoute = createRoute({
  path: '/stores/$storeId/inventory-management',
  component: InventoryManagementPage,
  getParentRoute: () => authRoute,
});

function InventoryManagementPage() {
  const { storeId } = storesInventoryManagementRoute.useParams();
  console.log(storeId);
  return <div className="h-full w-full p-5">Hello</div>;
}
