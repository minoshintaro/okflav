import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { DUMMY_ID } from '../constants';
import { postSchema } from '../types/schemas';
import { turso, addRecord, findTargetId } from './libs/turso';

const app = new Hono();



app.post('/', zValidator('json', postSchema), async (c) => {
  const { areaId, brandId, brandName, productId, productName, userName, message } = c.req.valid('json');

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

async function getPosts(condition: string = '', args: any[] = []) {
  try {
    const sql = `
      select
        p.id,
        brands.name as brand_name,
        products.name as product_name,
        areas.name as area_name,
        p.message,
        users.name as user_name,
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

app.get('/', async (c) => {
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
