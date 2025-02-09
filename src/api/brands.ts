import { Hono } from 'hono';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { turso, addRecord } from './libs/turso';

const app = new Hono();

// PRAGMA table_info('brands');
// 0 id INTEGER
// 1 area_id INTEGER NOT NULL
// 2 name TEXT NOT NULL

const brandSchema = z.object({
  area_id: z.coerce.number(),
  name: z.string().min(1, '名前は必須です'),
});

app.get('/', async(c) => {
  const name = c.req.query('name');
  const sql = name ? 'SELECT * FROM brands WHERE name = ?' : 'SELECT * FROM brands';
  const args = name ? [name] : [];
  try {
    const { rows } = await turso.execute({ sql, args });
    return c.json(rows);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

app.post('/', zValidator('json', brandSchema), async (c) => {
  const { area_id, name } = c.req.valid('json');

  try {
    const result = await addRecord('brands', ['area_id', 'name'], [area_id, name || null]);
    return c.json({ message: '銘柄が追加されました', data: result.rows[0] });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return c.json({ error: '既に存在します' }, 400);
      }
    }
    return c.json({ error: '登録失敗' }, 500);
  }
});

export { app as brands };
