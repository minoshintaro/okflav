import { Hono } from 'hono';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { turso, addRecord } from './libs/turso';

const app = new Hono();

const postSchema = z.object({
  product_id: z.number(),
  user_id: z.number(),
  message: z.string().min(1, 'メッセージは必須'),
});


app.post('/', zValidator('json', postSchema), async (c) => {
  const { product_id, user_id, message } = c.req.valid('json');

  try {
    const { rows } = await addRecord(
      'posts',
      ['product_id', 'user_id', 'message'],
      [product_id, user_id, message]
    );
    return c.json({ message: '投稿を追加', data: rows[0] });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return c.json({ error: '既値あり' }, 400);
      }
    }
    return c.json({ error: '登録失敗' }, 500);
  }
});

async function getPosts(condition: string = '', args: any[] = []) {
  try {
    const sql = `
      select
        p.id,
        p.message,
        users.name as user_name,
        products.name as product_name,
        brands.name as brand_name,
        areas.name as area_name,
        p.created_at,
        p.updated_at
      from posts as p
      join users on p.user_id = users.id
      join products on p.product_id = products.id
      join brands on products.brand_id = brands.id
      left join areas on brands.area_id = areas.id
      ${condition ? ` ${condition}` : ''}
      order by p.created_at desc
      limit 50
    `;
    const result = await turso.execute({ sql, args });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('データ取得ならず');
  }
}

app.get('/latest', async (c) => {
  const { rows } = await getPosts();
  return c.json(rows);
});

app.get('/brands/:id', async (c) => {
  const brandId = Number(c.req.param('id'));
  if (isNaN(brandId)) return c.json({ error: 'ブランドIDが不正' }, 400);
  const { rows } = await getPosts('where brands.id = ?', [brandId]);
  return c.json(rows);
});

app.get('/products/:id', async (c) => {
  const productId = Number(c.req.param('id'));
  if (isNaN(productId)) return c.json({ error: '商品IDが不正' }, 400);
  const { rows } = await getPosts('where products.id = ?', [productId]);
  return c.json(rows);
});

app.get('/users/:id', async (c) => {
  const userId = Number(c.req.param('id'));
  if (isNaN(userId)) return c.json({ error: 'ユーザーIDが不正' }, 400);
  const { rows } = await getPosts('where users.id = ?', [userId]);
  return c.json(rows);
});

export { app as posts };
