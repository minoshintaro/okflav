import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { brands, products, sakenowa } from './routes';

const app = new Hono().basePath('/api');

// CORS設定（フロントエンド用）
app.use('*', cors());

app.get('/', (c) => {
  const message = 'Hello, world!';
  return c.text(`${message}`);
});

// ルーティング
app.route('/brands', brands);
app.route('/products', products);
app.route('/sakenowa', sakenowa);

// 開発サーバー
const server = serve({
  fetch: app.fetch,
  port: 3000,
}, () => {
  console.log('Server is running on http://localhost:3000');
});

process.on('SIGINT', () => {
  server.close((err?: Error) => {
    console.log(err ? 'サーバー停止中にエラーが発生しました' : 'サーバーが停止しました');
    process.exit(0);
  });
});
