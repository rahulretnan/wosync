import { rootRoute } from './routes/__root';
import { authLayoutRoute } from './routes/_auth.layout';
import { appLayoutRoute } from './routes/_app.layout';
import { authRoute } from './routes/_authenticated';
import { signinRoute } from './routes/signin';
import { indexRoute } from './routes/dashboard';
import { storesRoute } from './routes/stores';
import { createStoreRoute } from './routes/stores/store.create';
import { storesIntegrationSuccessRoute } from './routes/stores/$storeId/integration/success';
import { storesInventoryManagementRoute } from './routes/stores/$storeId/inventory-management';
import { storesProductManagementRoute } from './routes/stores/$storeId/product-management';
import { storesOrderManagementRoute } from './routes/stores/$storeId/order-management';
import { storesCustomerManagementRoute } from './routes/stores/$storeId/customer-management';
import { storesSupplierManagementRoute } from './routes/stores/$storeId/supplier-management';

export const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([signinRoute]),
  authRoute.addChildren([
    appLayoutRoute.addChildren([
      indexRoute,
      storesRoute.addChildren([
        createStoreRoute,
        storesIntegrationSuccessRoute,
        storesInventoryManagementRoute,
        storesProductManagementRoute,
        storesOrderManagementRoute,
        storesCustomerManagementRoute,
        storesSupplierManagementRoute,
      ]),
    ]),
  ]),
]);
