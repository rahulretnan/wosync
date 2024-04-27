import { createRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { authRoute } from '../../../_authenticated';

dayjs.extend(relativeTime);

export const storesCustomerManagementRoute = createRoute({
  path: '/stores/$storeId/customer-management',
  component: CustomerManagementPage,
  getParentRoute: () => authRoute,
});

function CustomerManagementPage() {
  const { storeId } = storesCustomerManagementRoute.useParams();
  console.log(storeId);
  return <div className="h-full w-full p-5">Hello</div>;
}
