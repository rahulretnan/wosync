import { createFileRoute } from '@tanstack/react-router';
import { checkAuth } from '../lib/auth';

export const Route = createFileRoute('/')({
  beforeLoad: checkAuth,
  component: Index,
  pendingComponent: () => <div>Loading...</div>,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
