import { Hono } from 'hono';
import { turso } from './libs/turso';

const app = new Hono();

app.get('/', async(c) => {
  try {
    const { rows } = await turso.execute('SELECT * FROM areas');
    return c.json(rows);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得ならず' }, 500);
  }
});

export { app as areas };
