import { createRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { authRoute } from '../../../_authenticated';

dayjs.extend(relativeTime);

export const storesSupplierManagementRoute = createRoute({
  path: '/stores/$storeId/supplier-management',
  component: SupplierManagementPage,
  getParentRoute: () => authRoute,
});

function SupplierManagementPage() {
  const { storeId } = storesSupplierManagementRoute.useParams();
  console.log(storeId);
  return <div className="h-full w-full p-5">Hello</div>;
}
