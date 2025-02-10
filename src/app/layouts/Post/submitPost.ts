import { postData } from '../../../utils';

type SubmitPost = {
  selectedBrand: Turso.BrandData | null;
  selectedProduct: Turso.ProductData | null;
  activeUser: Turso.UserData | null;
  brand: Sakenowa.Brand;
  area: Sakenowa.Area;
  product: Turso.ProductData;
  message: string;
  signature: string;
};

export async function submitPost({
  selectedBrand,
  selectedProduct,
  activeUser,
  brand,
  area,
  product,
  message,
  signature,
}: SubmitPost) {
  try {
    // 1️⃣ brand を登録 or 取得（直列処理）
    const brandResponse = selectedBrand ?? await postData<{ id: number }>('/api/brands', {
      area_id: area.id,
      name: brand.name,
    });
    if (!brandResponse || typeof brandResponse.id !== "number") {
      throw new Error("ブランドIDの取得に失敗しました");
    }
    const brand_id = brandResponse.id;

    // 2️⃣ product を brand_id をもとに登録 or 取得（直列処理）
    const productResponse = selectedProduct ?? await postData<{ id: number }>('/api/products', {
      brand_id,
      name: product.name,
    });
    if (!productResponse || typeof productResponse.id !== "number") {
      throw new Error("商品IDの取得に失敗しました");
    }
    const product_id = productResponse.id;

    // 3️⃣ user を登録 or 取得（並列処理）
    const userResponse = activeUser ?? await postData<{ id: number }>('/api/users', {
      name: signature,
    });
    if (!userResponse || typeof userResponse.id !== "number") {
      throw new Error("ユーザーIDの取得に失敗しました");
    }
    const user_id = userResponse.id;

    // 4️⃣ post を登録
    const newPost = await postData<{ id: number }>('/api/posts', {
      brand_id,
      product_id,
      user_id,
      message,
    });

    console.log('newPost:', newPost);
    alert("投稿しました！");
  } catch (error) {
    console.error("投稿エラー:", error);
    alert("投稿に失敗しました");
  }
}
