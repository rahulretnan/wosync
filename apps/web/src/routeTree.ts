import { rootRoute } from './routes/__root';
import { authLayoutRoute } from './routes/_auth.layout';
import { appLayoutRoute } from './routes/_app.layout';
import { authRoute } from './routes/_authenticated';
import { signinRoute } from './routes/signin';
import { indexRoute } from './routes/dashboard';

export const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([signinRoute]),
  authRoute.addChildren([appLayoutRoute.addChildren([indexRoute])]),
]);
