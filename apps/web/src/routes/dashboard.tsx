import { createRoute } from '@tanstack/react-router';
import { authRoute } from './_authenticated';
import { Card } from 'antd';

export const indexRoute = createRoute({
  path: '/',
  component: Dashboard,
  getParentRoute: () => authRoute,
});

function Dashboard() {
  console.log('Dashboard');
  return (
    <Card className="p-2">
      <h3>Welcome Home!</h3>
    </Card>
  );
}
