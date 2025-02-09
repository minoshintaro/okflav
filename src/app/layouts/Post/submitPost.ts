import { postData } from '../../../utils';

type SubmitPost = {
  selectedBrand?: Turso.BrandData;
  selectedProduct?: Turso.ProductData;
  user?: Turso.UserData;
  brand: Sakenowa.Brand;
  area: Sakenowa.Area;
  product: Turso.ProductData;
  message: string;
  signature: string;
};

export async function submitPost({
  selectedBrand,
  selectedProduct,
  user,
  brand,
  area,
  product,
  message,
  signature,
}: SubmitPost) {
  try {
    const brand_id = selectedBrand?.id ?? await postData(
      '/api/brands',
      { area_id: area.id, name: brand.name, furigana: '' }
    );
    const product_id = selectedProduct?.id ?? await postData(
      '/api/products',
      { brand_id, name: product.name }
    );
    const user_id = user?.id ?? await postData(
      '/api/users',
      { name: signature }
    );
    const newPost = await postData(
      '/api/posts',
      { brand_id, product_id, user_id, message }
    );
    console.log('newPost:', newPost);
  } catch (error) {
    console.error("投稿エラー:", error);
    alert("投稿に失敗しました");
  }
}
