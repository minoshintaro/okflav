import { Hono, type Context } from 'hono';
import { getData } from "../utils";

const app = new Hono();

async function getDataAndRespond<T extends Record<string, any>>(c: Context, endpoint: string) {
  const response = await getData<T & { copyright: string }>(`https://muro.sakenowa.com/sakenowa-data/api/${endpoint}`);
  return c.json(response);
}

app.get('/areas', async(c: Context) => getDataAndRespond<{ areas: Sakenowa.Area[] }>(c, 'areas'));
app.get('/brands', async(c: Context) => getDataAndRespond<{ brands: Sakenowa.Brand[] }>(c, 'brands'));
app.get('/breweries', async(c: Context) => getDataAndRespond<{ breweries: Sakenowa.Brewery[] }>(c, 'breweries'));
app.get('/flavor-chart', async(c: Context) => getDataAndRespond<{ flavorChart: Sakenowa.FlavorChart[] }>(c, 'flavor-chart'));
app.get('/tags', async(c: Context) => getDataAndRespond<{ tags: Sakenowa.FlavorTag[] }>(c, 'tags'));
app.get('/brand-flavor-tags', async(c: Context) => getDataAndRespond<{ flavorTags: Sakenowa.BrandFlavorTag[] }>(c, 'brand-flavor-tags'));

export { app as sakenowa };
