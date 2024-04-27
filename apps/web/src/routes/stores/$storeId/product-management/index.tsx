import { createRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { authRoute } from '../../../_authenticated';
import ProductManagementTabs from '@ui/components/product-management/product-management-tabs';

dayjs.extend(relativeTime);

export const storesProductManagementRoute = createRoute({
  path: '/stores/$storeId/product-management',
  component: ProductManagementPage,
  getParentRoute: () => authRoute,
});

function ProductManagementPage() {
  const { storeId } = storesProductManagementRoute.useParams();
  const searchParams: { activeTab: string } =
    storesProductManagementRoute.useSearch();
  return (
    <div className="h-full w-full p-1">
      <ProductManagementTabs storeId={storeId} searchParams={searchParams} />
    </div>
  );
}
