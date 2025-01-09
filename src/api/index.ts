import { serve } from '@hono/node-server'
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello, world!');
});

console.log(`Server is running on port 3000`);

serve({
  fetch: app.fetch,
  port: 3000,
});
