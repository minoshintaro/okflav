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
    select
      posts.id,
      posts.brand_id,
      posts.product_id,
      posts.user_id,
      posts.content,
      posts.created_at,
      users.name as user_name,
      brands.name as brand_name,
      products.name as product_name
    from posts
    join users on posts.user_id = users.id
    join brands on posts.brand_id = brands.id
    join products on posts.product_id = products.id
    order by posts.created_at desc
    limit ${to - from} offset ${from}
  `;
  const { rows } = await turso.execute(query);
  return c.json(rows);
});

app.get('/lineup', async (c) => {
  const query = `
    select
      posts.brand_id,
      posts.product_id,
      posts.created_at,
      brands.name as brand_name,
      products.name as product_name
    from posts
    join brands on posts.brand_id = brands.id
    join products on posts.product_id = products.id
    order by posts.created_at desc
  `;

  const { rows } = await turso.execute(query);
  return c.json(rows);
});

app.post('/', zValidator('json', postSchema), async (c) => {
  const { brand_id, product_id, user_id, content } = c.req.valid('json');

  try {
    // 投稿を挿入
    await turso.execute({
      sql: `
        insert into posts (brand_id, product_id, user_id, content, created_at)
        values (?, ?, ?, ?, current_timestamp)
      `,
      args: [brand_id, product_id, user_id, content],
    });

    // 挿入したデータを取得
    const result = await turso.execute({
      sql: `
        select
          posts.id,
          posts.brand_id,
          posts.product_id,
          posts.user_id,
          posts.content,
          posts.created_at,
          users.name as user_name,
          brands.name as brand_name,
          products.name as product_name
        from posts
        join users on posts.user_id = users.id
        join brands on posts.brand_id = brands.id
        join products on posts.product_id = products.id
        where posts.id = last_insert_rowid()
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
