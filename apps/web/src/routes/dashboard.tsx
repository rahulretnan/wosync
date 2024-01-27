import { createRoute } from '@tanstack/react-router';
import { authRoute } from './_authenticated';

export const indexRoute = createRoute({
  path: '/',
  component: Dashboard,
  getParentRoute: () => authRoute,
});

function Dashboard() {
  console.log('Dashboard');
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
