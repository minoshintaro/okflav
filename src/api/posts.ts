import { Hono } from 'hono';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { DUMMY_ID } from '../constants';
import { turso, addRecord, findTargetId } from './libs/turso';

const app = new Hono();

const postSchema = z.object({
  area_id: z.number(),
  brand_id: z.number().optional(),
  brand_name: z.string(),
  product_id: z.number().optional(),
  product_name: z.string(),
  message: z.string().min(1, 'メッセージは必須'),
  signature: z.string(),
});

app.post('/', zValidator('json', postSchema), async (c) => {
  const { area_id, brand_id, brand_name, product_id, product_name, message, signature } = c.req.valid('json');

  try {
    await turso.execute('BEGIN TRANSACTION');

    let brandId = brand_id;
    if (brand_id === DUMMY_ID) {
      const { rows } = await addRecord('brands', ['area_id', 'name'], [area_id, brand_name]);
      brandId = Number(rows[0].id);
    }

    let productId = product_id;
    if (product_id === DUMMY_ID) {
      const { rows } = await addRecord('products', ['brand_id', 'name'], [brandId, product_name]);
      productId = Number(rows[0].id);
    }

    let userId = await findTargetId('users', 'name', signature);
    if (!userId) {
      const { rows } = await addRecord('users', ['name'], [signature]);
      userId = Number(rows[0].id);
    }

    const newPost = await addRecord('posts', ['product_id', 'user_id', 'message'], [productId, userId, message]);

    await turso.execute('COMMIT');

    return c.json({ success: true, data: newPost});
  } catch (error) {
    await turso.execute('ROLLBACK');
    return c.json({ success: false, error: 'Failed to create post.' }, 500);
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
