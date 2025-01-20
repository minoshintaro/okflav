import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { turso } from '../libs';

const app = new Hono();

const validateProduct = validator('json', (value, c) => {
  const { name, furigana } = value;

  if (typeof name !== 'string' || name.trim() === '') {
    return c.json({ success: false, error: 'Invalid name' }, 400);
  }

  return { name, furigana };
});

// ブランド一覧取得
app.get('/', async(c) => {
  try {
    const { rows } = await turso.execute("SELECT * FROM brands");
    return c.json({ rows });
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

// ブランド登録
app.post('/', validateProduct, async (c) => {
  const { name, furigana } = c.req.valid('json');

  try {
    const result = await turso.execute({
      sql: 'INSERT INTO products (name, furigana) VALUES (?, ?) RETURNING *',
      args: [name, furigana || null],
    });
    return c.json({ message: '銘柄が追加されました', data: result.rows[0] });
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

export { app as brands };
