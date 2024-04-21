import { createRoute } from '@tanstack/react-router';
import { authRoute } from './_authenticated';
import AllStoresDashboard from '@ui/components/dashboards/all-stores-dashboard';
import { useCurrentStore } from '@ui/hooks/useCurrentStore';
import StoreDashboard from '@ui/components/dashboards/store-dashboard';

export const indexRoute = createRoute({
  path: '/',
  component: Dashboard,
  getParentRoute: () => authRoute,
});

function Dashboard() {
  const { currentView } = useCurrentStore();
  return (
    <div className="p-2">
      {currentView === 'ALL' ? <AllStoresDashboard /> : <StoreDashboard />}
    </div>
  );
}
