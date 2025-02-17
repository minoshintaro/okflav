import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { getData } from '../../utils/fetchData';
import type { SampleProduct, SamplePost } from '../../api/sample';

export const postingBrandDataAtom = atom<Turso.BrandData | null>(null);
export const postingProductDataAtom = atom<Turso.ProductData | null>(null);
export const signatureAtom = atom<string>('');

// サンプルデータ ==================================================

export const lineupAtom = atom<Promise<SampleProduct[]>>(async () => {
  return getData('/api/sample/products');
});

export const collectionAtom = atomFamily((key: string) => atom<Promise<SamplePost[]>>(async () => {
  return getData(`/api/sample/${key}`);
}));
