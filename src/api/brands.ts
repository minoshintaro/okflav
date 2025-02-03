import { Hono } from 'hono';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { turso } from './libs';

const app = new Hono();

// PRAGMA table_info('brands');
// 0 id INTEGER
// 1 area_id INTEGER NOT NULL
// 2 name TEXT NOT NULL
// 3 furigana TEXT

const brandSchema = z.object({
  area_id: z.coerce.number(),
  name: z.string().min(1, '名前は必須です'),
  furigana: z.string().optional(),
});

app.get('/', async(c) => {
  try {
    const { rows } = await turso.execute('SELECT * FROM brands');
    return c.json({ rows });
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

app.post('/', zValidator('json', brandSchema), async (c) => {
  const { area_id, name, furigana } = c.req.valid('json');

  try {
    const result = await turso.execute({
      sql: 'INSERT INTO brands (area_id, name, furigana) VALUES (?, ?, ?) RETURNING *',
      args: [area_id, name, furigana || null],
    });
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
