import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { DUMMY_ID } from '../constants';
import { newPostSchema } from '../types/schemas';
import { turso, addRecord, findTargetId, getPosts } from './libs/turso';

const app = new Hono();

app.post('/', zValidator('json', newPostSchema), async (c) => {
  const body = await c.req.json();
  console.log('Received data:', body);

  const { brandId, brandName, productId, productName, userName, message } = c.req.valid('json');

  try {
    await turso.execute('BEGIN TRANSACTION');

    let brand_id = brandId;
    if (brand_id === DUMMY_ID) {
      const { rows } = await addRecord('brands', ['area_id', 'name'], [areaId, brandName]);
      brand_id = Number(rows[0].id);
    }

    let product_id = productId;
    if (product_id === DUMMY_ID) {
      const { rows } = await addRecord('products', ['brand_id', 'name'], [brand_id, productName]);
      product_id = Number(rows[0].id);
    }

    let user_id = await findTargetId('users', 'name', userName);
    if (!user_id) {
      const { rows } = await addRecord('users', ['name'], [userName]);
      user_id = Number(rows[0].id);
    }

    const newPost = await addRecord(
      'posts',
      ['product_id', 'user_id', 'message'],
      [product_id, user_id, message]
    );

    await turso.execute('COMMIT');

    return c.json({ success: true, data: newPost});
  } catch (error) {
    await turso.execute('ROLLBACK');
    return c.json({ success: false, error: 'Failed to create post.' }, 500);
  }
});

app.get('/', async (c) => {
  const { rows } = await getPosts();
  return c.json(rows);
});

app.get('/brands/:id', async (c) => {
  const brandId = Number(c.req.param('id'));
  if (isNaN(brandId)) return c.json({ error: 'ブランドIDが不正' }, 400);
  const { rows } = await getPosts({ where: 'brands.id', equals: brandId });
  return c.json(rows);
});

app.get('/products/:id', async (c) => {
  const productId = Number(c.req.param('id'));
  if (isNaN(productId)) return c.json({ error: '商品IDが不正' }, 400);
  const { rows } = await getPosts({ where: 'products.id', equals: productId });
  return c.json(rows);
});

app.get('/users/:id', async (c) => {
  const userId = Number(c.req.param('id'));
  if (isNaN(userId)) return c.json({ error: 'ユーザーIDが不正' }, 400);
  const { rows } = await getPosts({ where: 'users.id', equals: userId });
  return c.json(rows);
});

export { app as posts };
