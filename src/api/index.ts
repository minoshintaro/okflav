import { Hono } from 'hono';
import { areas } from './areas';
import { brands } from './brands';
import { posts } from './posts';
import { products } from './products';
import { sakenowa } from './sakenowa';
import { sample } from './sample';

const app = new Hono().basePath('/api');

app.get('/', (c) => {
  const message = 'Hello, world!';
  return c.text(`${message}`);
});

// ルーティング
app.route('/areas', areas);
app.route('/posts', posts);
app.route('/brands', brands);
app.route('/products', products);
app.route('/sakenowa', sakenowa);
app.route('/sample', sample);

export default app;
