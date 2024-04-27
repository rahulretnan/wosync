import { createRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { authRoute } from '../../../_authenticated';

dayjs.extend(relativeTime);

export const storesProductManagementRoute = createRoute({
  path: '/stores/$storeId/product-management',
  component: ProductManagementPage,
  getParentRoute: () => authRoute,
});

function ProductManagementPage() {
  const { storeId } = storesProductManagementRoute.useParams();
  return <div className="h-full w-full p-5">Hello</div>;
}
