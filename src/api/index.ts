import { Hono } from 'hono';

const app = new Hono();

app.get('/api/', (c) => {
  return c.text('Hello, world!');
});

export default app;
