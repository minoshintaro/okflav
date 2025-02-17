import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { userSchema } from '../types/schemas';
import { addRecord, getData } from './libs/turso';

const app = new Hono();

app.post('/', zValidator('json', userSchema), async (c) => {
  const { name } = c.req.valid('json');

  try {
    const data = await addRecord('users', { name }); // 書込み時、rows, columns は空
    return c.json({ message: 'ユーザーを追加', data });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return c.json({ errorCode: 'DUPLICATE_NAME', message: '既に使われている名前です' }, 400);
      }
      if (error.message.includes('INVALID_NAME')) {
        return c.json({ errorCode: 'INVALID_NAME', message: '名前が無効です' }, 400);
      }
    }
    return c.json({ errorCode: 'UNKNOWN_ERROR', message: '登録に失敗しました' }, 500);
  }
});

app.get('/', async (c) => {
  const name = c.req.query('name');
  const filter = name ? { where: 'name', equals: name } : undefined;

  try {
    const { rows } = await getData('users', filter);
    return c.json(rows);
  } catch (error) {
    return c.json({ error: 'データ取得ならず' }, 500);
  }
});

app.get('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'IDが不正' }, 400);

  try {
    const { rows } = await getData('users', { where: 'id', equals: id });
    return c.json(rows);
  } catch (error) {
    return c.json({ error: 'データ取得ならず' }, 500);
  }
});

export { app as users };
