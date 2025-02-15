import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { userSchema } from '../types/schemas';
import { turso, addRecord } from './libs/turso';

const app = new Hono();

app.post('/', zValidator('json', userSchema), async (c) => {
  const { name } = c.req.valid('json');

  try {
    const { rows } = await addRecord(
      'users',
      ['name'],
      [name]
    );
    return c.json({ message: 'ユーザーを追加', data: rows[0] });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return c.json({ error: '既値あり' }, 400);
      }
    }
    return c.json({ error: '登録失敗' }, 500);
  }
});

app.get('/', async(c) => {
  const name = c.req.query('name');
  const sql = name ? 'SELECT * FROM users WHERE name = ?' : 'SELECT * FROM users';
  const args = name ? [name] : [];

  try {
    const { rows } = await turso.execute({ sql, args });
    return c.json(rows);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得ならず' }, 500);
  }
});

export { app as users };
