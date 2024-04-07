import { rootRoute } from './routes/__root';
import { authLayoutRoute } from './routes/_auth.layout';
import { appLayoutRoute } from './routes/_app.layout';
import { authRoute } from './routes/_authenticated';
import { signinRoute } from './routes/signin';
import { indexRoute } from './routes/dashboard';
import { storesRoute } from './routes/stores';
import { createStoreRoute } from './routes/stores/store.create';
import { storesIntegrationSuccessRoute } from './routes/stores/integration/success';

export const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([signinRoute]),
  authRoute.addChildren([
    appLayoutRoute.addChildren([
      indexRoute,
      storesRoute.addChildren([
        createStoreRoute,
        storesIntegrationSuccessRoute,
      ]),
    ]),
  ]),
]);
