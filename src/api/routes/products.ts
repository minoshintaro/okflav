import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { turso } from '../libs';

const app = new Hono();

const validateProduct = validator('json', (value, c) => {
  const { name, brand_id } = value;

  if (typeof name !== 'string' || name.trim() === '') {
    return c.json({ success: false, error: 'Invalid name' }, 400);
  }
  if (typeof brand_id !== 'number' || brand_id <= 0) {
    return c.json({ success: false, error: 'Invalid brand ID' }, 400);
  }

  return { name, brand_id };
});

// ブランド一覧取得
app.get('/', async(c) => {
  try {
    const { rows } = await turso.execute("SELECT * FROM products");
    return c.json({ rows });
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

// ブランド登録
app.post('/', validateProduct, async (c) => {
  const { name, brand_id } = c.req.valid('json');

  try {
    const result = await turso.execute({
      sql: 'INSERT INTO products (name, brand_id) VALUES (?, ?) RETURNING *',
      args: [name, brand_id],
    });
    return c.json({ message: '製品が追加されました', data: result.rows[0] });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return c.json({ success: false, error: 'すでに登録されています' }, 400);
      }
      return c.json({ success: false, error: error.message }, 500);
    }
    return c.json({ success: false, error: '不明なエラーが発生しました' }, 500);
  }
});

export { app as products };
