import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { turso, findTargetId, addRecord, updateRecord } from '../libs/turso';
import type { ResultSet } from '@libsql/client';

const app = new Hono();

function getIdInRecord(record: ResultSet): number {
  return record && record.lastInsertRowid ? Number(record.lastInsertRowid) : 0;
}

const postSchema = z.object({
  user: z.object({
    name: z.string().min(1, 'user.name is required'),
  }),
  brand: z.object({
    name: z.string().min(1, 'brand.name is required'),
    area_id: z.number(), // 既存のエリアIDを指定
  }),
  product: z.object({
    name: z.string().min(1, 'product.name is required'),
  }),
  message: z.string().min(1, 'message is required'),
});


app.post(
  '/posts',
  zValidator('json', postSchema),
  async (c) => {
    const { user, brand, product, message } = c.req.valid('json');

    try {
      await turso.execute('BEGIN TRANSACTION');

      let userId: number;
      const targetUserId = await findTargetId('users', 'name', user.name);
      if (targetUserId === null) {
        const newUser = await addRecord('users', ['name'], [user.name]);
        userId = getIdInRecord(newUser);
      } else {
        userId = targetUserId;
      }

      let brandId: number;
      const targetBrandId = await findTargetId('brands', 'name', brand.name);
      if (targetBrandId === null) {
        const newBrand = await addRecord('brands', ['area_id', 'name'], [brand.area_id, brand.name]);
        brandId = getIdInRecord(newBrand);
      } else {
        brandId = targetBrandId;
      }

      let productId: number;
      const targetProductId = await findTargetId('products', 'name', product.name);
      if (targetProductId === null) {
        const newProduct = await addRecord('products', ['brand_id', 'name'], [brandId, product.name]);
        productId = getIdInRecord(newProduct);
      } else {
        productId = targetProductId;
      }

      const newPost = await addRecord('posts', ['product_id', 'user_id', 'message'], [productId, userId, message]);

      await turso.execute('COMMIT');

      return c.json({ success: true, postId: getIdInRecord(newPost) });
    } catch (error) {
      await turso.execute('ROLLBACK');
      return c.json({ success: false, error: 'Failed to create post.' }, 500);
    }
  }
);

app.put(
  '/posts/:id',
  zValidator('json', postSchema),
  async (c) => {
    const postId = Number(c.req.param('id'));
    try {

    } catch (error) {

    }
  }
);

export { app as postApp };
