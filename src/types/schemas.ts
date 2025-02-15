import { z } from 'zod'

export const areaSchema = z.object({
  name: z.string(),
});

export const brandSchema = z.object({
  areaId: z.coerce.number().int(),
  name: z.string(),
});

export const postSchema = z.object({
  areaId: z.number().int(),
  brandId: z.number().int(),
  brandName: z.string(),
  productId: z.number().int(),
  productName: z.string(),
  userName: z.string(),
  message: z.string(),
});

export const productSchema = z.object({
  brandId: z.number().int(),
  name: z.string(),
});

export const userSchema = z.object({
  name: z.string(),
});

