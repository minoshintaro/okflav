import { Hono } from 'hono';
import { getApp } from './get';
import { postApp } from './post';

const app = new Hono();

app.route('/', getApp);
app.route('/', postApp);

export { app as posts };
