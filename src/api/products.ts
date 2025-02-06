import { Hono } from 'hono';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { turso } from './libs/turso';

const app = new Hono();

// PRAGMA table_info('brands');
// 0 id INTEGER
// 1 brand_id INTEGER NOT NULL
// 2 name TEXT NOT NULL
// 3 created_at DATETIME

const productSchema = z.object({
  brand_id: z.number(),
  name: z.string().min(1, '名前は必須です').max(50, '名前は50文字以内です'),
  // brand_id: z.number().int().positive('brand_idは正の整数である必要があります'),
});

app.get('/', async(c) => {
  try {
    const { rows } = await turso.execute('SELECT * FROM products');
    return c.json({ rows });
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

app.post('/', zValidator('json', productSchema), async (c) => {
  const { brand_id, name } = c.req.valid('json');

  try {
    const result = await turso.execute({
      sql: 'INSERT INTO products (name, brand_id) VALUES (?, ?) RETURNING *',
      args: [brand_id, name],
    });
    return c.json({ message: '商品が追加されました', data: result.rows[0] });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return c.json({ error: '既に存在します' }, 400);
      }
    }
    return c.json({ error: '登録失敗' }, 500);
  }
});

export { app as products };
