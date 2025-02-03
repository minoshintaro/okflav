
const flavorColorSchema = z.object({
  post_id: z.number(),
  name: z.string(),
  top: z.array(z.number()).nullable(),
  middle: z.array(z.number()),
  last: z.array(z.number()).nullable(),
});
