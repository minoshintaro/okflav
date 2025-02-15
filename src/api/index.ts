import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
import { serve } from '@hono/node-server';
import { areas } from './areas';
import { brands } from './brands';
import { posts } from './posts';
import { products } from './products';
import { sakenowa } from './sakenowa';
import { sample } from './sample';
import { users } from './users';

export const runtime = 'edge'

const app = new Hono().basePath(process.env.VERCEL ? '' : '/api');
app.use('*', cors());

app.get('/', (c) => {
  console.log("Request URL:", c.req.url);
  const message = 'Hello, world!';
  return c.text(`${message}`);
});

// ルーティング

app.route('/areas', areas);
app.route('/brands', brands);
app.route('/posts', posts);
app.route('/products', products);
app.route('/sakenowa', sakenowa);
app.route('/sample', sample);
app.route('/users', users);

export const GET = handle(app)
export const POST = handle(app)

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
