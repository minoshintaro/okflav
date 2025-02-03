import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { turso } from './libs';

const app = new Hono();

// PRAGMA table_info('posts');
// 0 id INTEGER
// 1 brand_id INTEGER NOT NULL
// 2 product_id INTEGER NOT NULL
// 3 user_id INTEGER NOT NULL
// 4 content TEXT NOT NULL
// 5 created_at DATETIME

const postSchema = z.object({
  brand_id: z.number(),
  product_id: z.number(),
  user_id: z.number(),
  content: z.string().min(1, '投稿内容は必須です'),
});


// GET /posts?from=0&to=50
app.get('/', async (c) => {
  const from = Number(c.req.query('from')) || 0;
  const to = Number(c.req.query('to')) || from + 50;
  const query = `
    SELECT
      p.id,
      p.brand_id,
      p.product_id,
      p.user_id,
      p.content,
      p.created_at,
      users.name AS user_name,
      brands.name AS brand_name,
      products.name AS product_name
    FROM posts p
    JOIN users ON p.user_id = users.id
    JOIN brands ON p.brand_id = brands.id
    JOIN products ON p.product_id = products.id
    ORDER BY p.created_at DESC
    LIMIT ${to - from} OFFSET ${from}
  `;
  const { rows } = await turso.execute(query);
  return c.json(rows);
});

app.get('/lineup', async (c) => {
  const query = `
    SELECT
      p.brand_id,
      p.product_id,
      p.created_at,
      brands.name AS brand_name,
      products.name AS product_name
    FROM posts p
    JOIN brands ON p.brand_id = brands.id
    JOIN products ON p.product_id = products.id
    ORDER BY p.created_at DESC
  `;
  const { rows } = await turso.execute(query);
  return c.json(rows);
});

app.post('/', zValidator('json', postSchema), async (c) => {
  const { brand_id, product_id, user_id, content } = c.req.valid('json');

  try {
    // 投稿を挿入
    await turso.execute({
      sql: `INSERT INTO posts (brand_id, product_id, user_id, content, created_at)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      args: [brand_id, product_id, user_id, content],
    });

    // 挿入したデータを取得
    const result = await turso.execute({
      sql: `
        SELECT p.id, p.brand_id, p.product_id, p.user_id, p.content, p.created_at,
          users.name AS user_name, brands.name AS brand_name, products.name AS product_name
        FROM posts p
        JOIN users ON p.user_id = users.id
        JOIN brands ON p.brand_id = brands.id
        JOIN products ON p.product_id = products.id
        WHERE p.id = last_insert_rowid();
      `,
      args: [],
    });

    return c.json({ message: '投稿が追加されました', data: result.rows[0] });
  } catch (error) {
    console.error(error);
    return c.json({ error: '投稿の登録に失敗しました' }, 500);
  }
});

export { app as posts };
