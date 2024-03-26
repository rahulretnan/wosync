import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { NhostProvider } from '@nhost/react';
import { nhost } from './lib/nhost';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';

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

export function App() {
  return (
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
  );
}

root.render(
  <StrictMode>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <App />
    </DevSupport>
  </StrictMode>,
);
