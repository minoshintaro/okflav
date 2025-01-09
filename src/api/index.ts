import { serve } from '@hono/node-server'
import { Hono } from 'hono';

const api = new Hono().basePath('/api');

api.get('/', (c) => {
  return c.text('Hello, world!');
});

serve({
  fetch: api.fetch,
  port: 3000,
});

console.log('Server is running on port 3000');
