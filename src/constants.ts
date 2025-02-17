export const DUMMY_ID = 0;
export const VALID_TABLE_KEYS = {
  areas: ['id', 'name'],
  brands: ['id', 'areaId', 'name'],
  products: ['id', 'brandId', 'name', 'createdAt'],
  users: ['id', 'name'],
  posts: ['id', 'productId', 'userId', 'message', 'createdAt', 'updatedAt'],
};
