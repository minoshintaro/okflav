import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { getData } from '../../utils/fetchData';
import type { SampleProduct, SamplePost } from '../../api/sample';

export const cachedBrandDataAtom = atom<Turso.BrandData | null>(null);
export const cachedProductDataAtom = atom<Turso.ProductData | null>(null);
export const signatureAtom = atom<string>('');

// サンプルデータ ==================================================

export const lineupAtom = atom<Promise<SampleProduct[]>>(async () => {
  return getData('/api/sample/products');
});

export const collectionAtom = atomFamily((key: string) => atom<Promise<SamplePost[]>>(async () => {
  return getData(`/api/sample/${key}`);
}));

// export const selectedPostAtom = atom<string>('latest');
// export const postDataAtom = atom((get) => {
//   const category = get(selectedPostAtom);
//   return (sampleData.post)[category] || [];
// });



// 銘柄 ==================================================

// ローディング状態
export const brandLoadingAtom = atom<boolean>(false);

// エラー管理
export const brandErrorAtom = atom<string | null>(null);

// データ取得
export const brandListAtom = atom<Promise<string[]>>(async () => {
  try {
    const data = await getData<{ rows: Turso.BrandData[] }>('/api/brands');
    return data ? data.rows.map((brand) => brand.name) : [];
  } catch (error) {
    console.error('ブランドリストの取得に失敗:', error);
    return [];
  }
});

// データ追加
// export const addBrandAtom = atom(null, async (get, set, newBrand: Database.Brand) => {
//     set(brandLoadingAtom, true);
//
//     try {
//       await postData('/api/brands', newBrand);
//       // 成功したらブランドリストを再取得して更新
//       const updatedData = await getData<{ rows: Database.Brand[] }>('/api/brands');
//       set(brandListAtom, updatedData?.rows.map((brand) => brand.name) ?? []);
//     } catch (error) {
//       set(brandErrorAtom, error instanceof Error ? error.message : 'ブランドの追加に失敗しました');
//     } finally {
//       set(brandLoadingAtom, false);
//     }
//   }
// );
