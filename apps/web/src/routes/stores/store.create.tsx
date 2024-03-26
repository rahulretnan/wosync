import { createRoute } from '@tanstack/react-router';
import { authRoute } from '../_authenticated';
import useAntd from '@ui/hooks/use-antd';
import { useBlocker } from '@ui/hooks/useBlocker';

export const createStoreRoute = createRoute({
  path: '/stores/create',
  component: CreateStore,
  getParentRoute: () => authRoute,
});

function CreateStore() {
  const { modal } = useAntd();
  useBlocker(
    async () =>
      await modal.confirm({
        title: 'Are you sure you want to discard the changes?',
      }),
    true,
  );

  return <div className="h-full w-full p-5">Hello</div>;
}
