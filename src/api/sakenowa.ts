import { Hono, type Context } from 'hono';
import { getData } from "../utils";

const app = new Hono();

const sakenowaUrl = 'https://muro.sakenowa.com/sakenowa-data/api';

app.get('/areas', async (c: Context) => {
  const response = await getData<Sakenowa.AreaData>(`${sakenowaUrl}/areas`);
  return c.json(response);
});

app.get('/brands', async (c: Context) => {
  const response = await getData<Sakenowa.BrandData>(`${sakenowaUrl}/brands`);
  return c.json(response);
});

app.get('/breweries', async (c: Context) => {
  const response = await getData<Sakenowa.BreweryData>(`${sakenowaUrl}/breweries`);
  return c.json(response);
});

app.get('/flavor-chart', async (c: Context) => {
  const response = await getData<Sakenowa.FlavorChartData>(`${sakenowaUrl}/flavor-chart`);
  return c.json(response);
});

app.get('/tags', async (c: Context) => {
  const response = await getData<Sakenowa.FlavorTagData>(`${sakenowaUrl}/tags`);
  return c.json(response);
});

app.get('/brand-flavor-tags', async (c: Context) => {
  const response = await getData<Sakenowa.BrandFlavorTagData>(`${sakenowaUrl}/brand-flavor-tags`);
  return c.json(response);
});

export { app as sakenowa };
