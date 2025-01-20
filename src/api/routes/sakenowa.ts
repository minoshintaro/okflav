import { Hono } from 'hono';
import { sakenowa } from '../libs';

const app = new Hono();

app.get('/areas', async(c) => {
  try {
    const data = await sakenowa.fetch('areas');
    return c.json(data);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

app.get('/brands', async(c) => {
  try {
    const data = await sakenowa.fetch('brands');
    return c.json(data);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

app.get('/breweries', async(c) => {
  try {
    const data = await sakenowa.fetch('breweries');
    return c.json(data);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

app.get('/flavor-chart', async(c) => {
  try {
    const data = await sakenowa.fetch('flavor-chart');
    return c.json(data);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

app.get('/tags', async(c) => {
  try {
    const data = await sakenowa.fetch('tags');
    return c.json(data);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

app.get('/brand-flavor-tags', async(c) => {
  try {
    const data = await sakenowa.fetch('brand-flavor-tags');
    return c.json(data);
  } catch (error) {
    return c.json({ success: false, error: 'データ取得に失敗しました' }, 500);
  }
});

export { app as sakenowa };
