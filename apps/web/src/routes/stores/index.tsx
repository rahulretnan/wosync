import { createRoute } from '@tanstack/react-router';
import { authRoute } from '../_authenticated';
import StoreTable from '@ui/components/store/store-table';

export const storesRoute = createRoute({
  path: '/stores',
  component: StoresList,
  getParentRoute: () => authRoute,
});

function StoresList() {
  return (
    <div className="h-full w-full p-1">
      <StoreTable />
    </div>
  );
}
