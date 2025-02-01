import { Hono } from 'hono';

const app = new Hono();

const products: Sample.Product[] = [
  { id: 1, brandName: '八海山', name: '純米大吟醸 雪室貯蔵三年', area: '新潟' },
  { id: 2, brandName: '獺祭', name: '純米大吟醸 磨き二割三分 遠心分離', area: '山口' },
  { id: 3, brandName: '雪男', name: '純米酒', area: '新潟' },
  { id: 4, brandName: '酔鯨', name: '特別純米酒', area: '高知' },
  { id: 5, brandName: 'あさ開', name: '純米酒 黄ラベル', area: '岩手' },
  { id: 6, brandName: '亀齢', name: '辛口純米', area: '広島' },
  { id: 7, brandName: '酔鯨', name: '純米吟醸 吟麗 秋あがり', area: '高知' },
  { id: 8, brandName: '鍋島', name: '特別純米 三十六萬石', area: '佐賀' },
  { id: 9, brandName: '大納川', name: '純米', area: '秋田' },
];

const posts: Sample.Post[] = [
  {
    id: 1,
    productId: 6,
    userId: 1,
    date: '2025-1-2',
    startColor: '#ebbba7',
    endColor: '#cfc7f8',
    content: '落ち着いた辛口の中に甘み。スッキリではなくしっかり（でもどっしりではない）、硬質だか角は丸い印象雑味はなく、全体を通じて味わいあり。何かに喩える対象はなく、素直に日本酒。後味にカラメル感。上の方にアルコール感がある。',
  },
  {
    id: 8,
    productId: 8,
    userId: 1,
    date: '2024-12-29',
    startColor: '#ebbba7',
    endColor: '#cfc7f8',
    content: '落ち着いた感じ。ピャーと広がることなく、ジッと日本酒。シャープというよりかたい。ラムネ感、シャワシャワした微発泡。',
  },
];

app.get('/products', (c) => c.json(products));
app.get('/posts', (c) => c.json(posts));

export { app as sample };
