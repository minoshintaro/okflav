import { serve } from '@hono/node-server';
import app from '../../api';

if (!process.env.VERCEL) {
  const server = serve({
    fetch: app.fetch,
    port: 3000,
  }, () => {
    console.log('Server is running on http://localhost:3000');
  });

  process.on('SIGINT', () => {
    console.log("Shutting down the server...");
    server.close?.(); // `close()` が存在する場合のみ実行
    process.exit(0);
  });
}

export default app;
