import { serve } from '@hono/node-server'
import { Hono } from 'hono';

const app = new Hono().basePath('/api');

app.get('/', (c) => {
  return c.text('Hello, world!');
});

app.get('/sakenowa', (c) => {
  return c.json({ message: 'Hello, sakenowa!' });
});

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log('Server is running on localhost:3000');
