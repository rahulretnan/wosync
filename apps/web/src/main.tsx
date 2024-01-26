import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { NhostProvider } from '@nhost/react';
import { nhost } from './lib/nhost';
import { NhostApolloProvider } from '@nhost/react-apollo';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost} connectToDevTools>
        <RouterProvider
          router={router}
          context={{
            auth: nhost.auth,
          }}
        />
      </NhostApolloProvider>
    </NhostProvider>
  </StrictMode>,
);
