import { atom } from 'jotai';
import { getData } from '../../utils/fetchData';

export const sakenowaBrandListAtom = atom(async () => {
  const data = await getData<{ copyright: string, brands: Sakenowa.Brand[] }>('/api/sakenowa/brands');
  return data.brands;
});

// 銘柄 ==================================================

// ローディング状態
export const brandLoadingAtom = atom<boolean>(false);

// エラー管理
export const brandErrorAtom = atom<string | null>(null);

// データ取得
export const brandListAtom = atom<Promise<string[]>>(async () => {
  try {
    const data = await getData<{ rows: Database.Brand[] }>('/api/brands');
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
