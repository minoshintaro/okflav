import { createRouteTree, createRouter } from '@tanstack/react-router';
import { routeTree } from './routes/__routeTree'; // 変更ポイント

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
