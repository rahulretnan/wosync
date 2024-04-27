import { createRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { authRoute } from '../../../_authenticated';

dayjs.extend(relativeTime);

export const storesOrderManagementRoute = createRoute({
  path: '/stores/$storeId/order-management',
  component: OrderManagementPage,
  getParentRoute: () => authRoute,
});

function OrderManagementPage() {
  const { storeId } = storesOrderManagementRoute.useParams();
  console.log(storeId);
  return <div className="h-full w-full p-5">Hello</div>;
}
