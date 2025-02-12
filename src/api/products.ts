import { Hono } from 'hono';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { turso, addRecord } from './libs/turso';

const app = new Hono();

const productSchema = z.object({
  brand_id: z.number().int(),
  name: z.string(),
});

app.post('/', zValidator('json', productSchema), async (c) => {
  const { brand_id, name } = c.req.valid('json');

  try {
    const { rows } = await addRecord(
      'products',
      ['brand_id', 'name'],
      [brand_id, name]
    );
    return c.json({ message: '商品を追加', data: rows[0] });
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
  const brandId = c.req.query('brand_id');
  const sql = brandId ? 'SELECT * FROM products WHERE brand_id = ?' : 'SELECT * FROM products';
  const args = brandId ? [brandId] : [];

  try {
    const { rows } = await turso.execute({ sql, args });
    return c.json(rows);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得ならず' }, 500);
  }
});

export { app as products };
