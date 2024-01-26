import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signin')({
  component: SignIn,
  pendingComponent: () => <div>Loading...</div>,
});

function SignIn() {
  return (
    <div className="p-2">
      <h3>Welcome Sign!</h3>
    </div>
  );
}
