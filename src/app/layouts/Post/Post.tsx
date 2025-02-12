import * as React from 'react';
// import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { DUMMY_ID } from '../../../constants';
import { cachedBrandDataAtom, cachedProductDataAtom, signatureAtom } from '../../../store';
import { useSakenowaData, useBrandData, useProductList, usePostData } from '../../hooks';
import { Button } from '../../components/Button';
import { Combobox } from '../../components/Combobox';
import { Textarea } from '../../components/Textarea';
import { TextField } from '../../components/TextField';
import { getAreaId } from './utils';

export function Post() {
  // ローカルステート
  const [selectedBrand, setSelectedBrand] = React.useState<Sakenowa.Brand | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<Turso.ProductData | null>(null);
  const [message, setMessage] = React.useState<string>('');

  // グローバルステート
  const [cachedBrandData, setCachedBrandData] = useAtom(cachedBrandDataAtom);
  const [cachedProductData, setCachedProductData] = useAtom(cachedProductDataAtom);
  const [signature, setSignature] = useAtom(signatureAtom);

  // データ
  const sakenowaData = useSakenowaData();
  const { data: brandData } = useBrandData(selectedBrand?.name ?? null);
  const { data: productList } = useProductList(cachedBrandData?.id ?? null);

  /**
   * # Brand
   *
   * Sakenowa銘柄一覧のコンボボックスから、
   * - Sakenowa銘柄を選択
   *   - 同じTurso銘柄があれば、それをキャッシュ
   *   - なければ、新規データを構成してキャッシュ（idはダミー）
   * - 自由入力
   *   - 新規データを構成してキャッシュ（idはダミー）
   */
  React.useEffect(() => {
    // 未選択なら、
    if (!selectedBrand) {
      setCachedBrandData(null);
      setSelectedProduct(null);
      return;
    }

    // 自由入力なら DUMMY_ID のオブジェクトなので、
    if (selectedBrand.id === DUMMY_ID) {
      setCachedBrandData({ id: DUMMY_ID, areaId: DUMMY_ID, name: selectedBrand.name });
      return;
    }

    // Sakenowaの銘柄を選んだら、
    setCachedBrandData(
      brandData && brandData.length > 0
        ? brandData[0] // 既存データ
        : {
          id: DUMMY_ID,
          areaId: getAreaId(sakenowaData, selectedBrand) ?? DUMMY_ID,
          name: selectedBrand.name
        } as Turso.BrandData // 新規登録データ
    );
  }, [selectedBrand, brandData]);

  /**
   * # Product
   */
  React.useEffect(() => {
    // 未選択なら、
    if (!selectedProduct || !cachedBrandData) {
      setCachedProductData(null);
      return;
    }

    // 自由入力なら DUMMY_ID のオブジェクトなので、
    if (selectedProduct.id === DUMMY_ID) {
      setCachedProductData({ id: DUMMY_ID, brandId: cachedBrandData.id, name: selectedProduct.name, createdAt: '' });
      return;
    }

    // Tursoの商品を選んだら、
    setCachedProductData(selectedProduct);
  }, [selectedProduct, cachedBrandData]);

  // Post ==================================================

  const { mutate } = usePostData();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!cachedBrandData || !cachedProductData || !message || !signature) {
      alert('未選択の項目があります');
      return;
    }

    const newPost: NewPost = {
      areaId: cachedBrandData.areaId,
      brandId: cachedBrandData.id,
      brandName: cachedBrandData.name,
      productId: cachedProductData.id,
      productName: cachedProductData.name,
      userName: signature,
      message,
    };

    console.log('送信するデータ:', JSON.stringify(newPost, null, '  '));

    mutate(newPost, {
      onSuccess: (data) => {
        console.log('投稿成功:', data);
        alert('投稿が成功しました！');
      },
      onError: (err) => {
        console.error('投稿エラー:', err);
        alert('投稿に失敗しました。');
      },
    });
  };

  return (
    <>
      <details open className="mb-4 text-xs">
        <summary>Debug</summary>
        <pre>Turso: {JSON.stringify(brandData)}</pre>
        <pre>Brand: {JSON.stringify(selectedBrand,)} <span className="text-blue-600">{JSON.stringify(cachedBrandData, null, '  ')}</span></pre>
        <pre>Products: <span className="text-blue-600">{JSON.stringify(productList, null, '  ')}</span></pre>
        <pre>Product: <span className="text-blue-600">{JSON.stringify(cachedProductData, null, '  ')}</span></pre>
        <pre>User: <span className="text-blue-600">{JSON.stringify(signature, null, '  ')}</span></pre>
      </details>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Combobox
            placeholder="銘柄（例：八海山）"
            list={sakenowaData.brands}
            current={selectedBrand}
            onCurrentChange={setSelectedBrand}
          />
          <Combobox
            placeholder="名称（例：純米大吟醸 雪室貯蔵三年）"
            list={productList ?? []}
            current={selectedProduct}
            onCurrentChange={setSelectedProduct}
          />
          <Textarea
            placeholder="香りや味わいは？"
            value={message}
            onValueChange={setMessage}
          />
          <div className="flex justify-end items-center gap-x-4">
            <label>署名</label>
            <TextField
              placeholder=""
              value={signature}
              onValueChange={setSignature}
            />
          </div>
        </div>
        <Button type="submit">投稿</Button>
      </form>
      <aside className='my-12'>
        <p className="text-xs text-gray-400">
          ※銘柄一覧に「<a href="https://sakenowa.com" target="_blank" className="underline underline-offset-2">さけのわデータ</a>」を利用しています
        </p>
      </aside>
    </>
  );
}
