import { Hono } from 'hono';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { turso, addRecord } from './libs/turso';

const app = new Hono();

// CREATE TABLE users (
// id INTEGER primary key autoincrement,
// name TEXT not null
// );

const userSchema = z.object({
  name: z.string().min(1, '名前は必須'),
});

// GET /users&name=lorem
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

app.post('/', zValidator('json', userSchema), async (c) => {
  const { name } = c.req.valid('json');

  try {
    const result = await addRecord('users', ['name'], [name]);
    return c.json({ message: 'ユーザー登録', data: result.rows[0] });
  } catch (error) {
    console.error('エラー：ユーザー登録:', error);
    return c.json({ error: 'エラー：ユーザー登録' }, 500);
  }
});

export { app as users };
