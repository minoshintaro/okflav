import * as React from 'react';
// import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { DUMMY_ID } from '../../../constants';
import { postingBrandDataAtom, postingProductDataAtom, signatureAtom } from '../../store';
import { useSakenowaData, useBrandData, useProductList, usePostData } from '../../hooks';
import { Button } from '../../components/Button';
import { Combobox } from '../../components/Combobox';
import { Textarea } from '../../components/Textarea';
import { TextField } from '../../components/TextField';
import { SakeSelector } from '../../features/SakeSelector';

export function Post() {
  // ローカルステート
  const [message, setMessage] = React.useState<string>('');

  // グローバルステート
  const [postingBrandData, setPostingBrandData] = useAtom(postingBrandDataAtom);
  const [postingProductData, setPostingProductData] = useAtom(postingProductDataAtom);
  const [signature, setSignature] = useAtom(signatureAtom);

  React.useEffect(() => {
    // コンボボックスで銘柄を変更したら、
    // - [1] 未選択 → 選択状態を解除
    // - [2] 選択かつキャッシュと一致 → キャッシュしたTursoデータを保存
    // - [3] 選択かつキャッシュと不一致
    //   - [3-1] 自由入力 → 名前だけ
    //   - [3-2] さけのわ銘柄を選択 → エリアIDと名前

    // [1] 未選択 → 選択状態を解除
    if (!selectedBrand) {
      setSelectedProduct(null);
      setPostingBrandData(null);
      setPostingProductData(null);
      return;
    }

    // [2] 選択かつキャッシュと一致 → キャッシュしたTursoデータを保存
    const matchedData = cachedBrandData.find(item => item.name === selectedBrand.name);
    if (matchedData) {
      setPostingBrandData(matchedData);
      return;
    }

    // [3] 選択かつキャッシュと不一致
    if (selectedBrand.id === DUMMY_ID) {
      setPostingBrandData({ id: DUMMY_ID, areaId: DUMMY_ID, name: selectedBrand.name });
    } else {
      const brewery = sakenowaData.breweries.find(item => item.id === selectedBrand.breweryId);
      const areaId = brewery ? brewery.areaId : DUMMY_ID;
      setPostingBrandData({ id: DUMMY_ID, areaId, name: selectedBrand.name});
    }
  }, [selectedBrand, JSON.stringify(cachedBrandData)]);

  React.useEffect(() => {
    // 前提：銘柄の選択、
    // - [1] 未選択 → 選択状態を解除
    // - [2] 選択 → コンボボックスに反映
    // コンボボックスで商品を変更したら、
    // - [1] 未選択 → 選択状態を解除
    // - [2] 選択かつキャッシュと一致 → キャッシュしたTursoデータを保存
    // - [3] 選択かつキャッシュと不一致
    //   - [3-1] 自由入力 → 名前だけ
    //   - [3-2] さけのわ銘柄を選択 → エリアIDと名前

    // [1] 未選択 → 選択状態を解除
    if (!selectedProduct) {
      setPostingProductData(null);
      return;
    }

    // [2] 選択かつキャッシュと一致 → キャッシュしたTursoデータを保存
    const matchedData = cachedProductList.find(item => item.name === selectedProduct.name);
    if (matchedData) {
      setPostingProductData(matchedData);
      return;
    }

    // - [3] 選択かつキャッシュと不一致
    const brandId = postingBrandData ? postingBrandData.id : DUMMY_ID;
    if (selectedProduct.id === DUMMY_ID) {
      setPostingProductData({ id: DUMMY_ID, brandId, name: selectedProduct.name, createdAt: '' });
    } else {
      setPostingProductData({ id: DUMMY_ID, brandId, name: selectedProduct.name, createdAt: ''});
    }
  }, [selectedProduct, JSON.stringify(postingBrandData), JSON.stringify(cachedProductList)]);

  // Post ==================================================

  const { mutate } = usePostData();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postingBrandData || !postingProductData || !message || !signature) {
      alert('未選択の項目があります');
      return;
    }

    const newPost: NewPost = {
      brandId: postingBrandData.id,
      brandName: postingBrandData.name,
      productId: postingProductData.id,
      productName: postingProductData.name,
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <SakeSelector
            onCachedBrandChange={setSelectedBrand}
            onCachedProductChange={setSelectedProduct}
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
      <details className="my-4 text-xs">
        <summary>Debug</summary>
        <pre>Turso: {JSON.stringify(cachedBrandData)}</pre>
        <pre>Brand: {JSON.stringify(selectedBrand,)} <span className="text-blue-600">{JSON.stringify(postingBrandData, null, '  ')}</span></pre>
        <pre>Products: <span className="text-blue-600">{JSON.stringify(cachedProductList, null, '  ')}</span></pre>
        <pre>Product: <span className="text-blue-600">{JSON.stringify(postingProductData, null, '  ')}</span></pre>
        <pre>User: <span className="text-blue-600">{JSON.stringify(signature, null, '  ')}</span></pre>
      </details>
      <aside className='my-12'>
        <p className="text-xs text-gray-400">
          ※銘柄一覧に「<a href="https://sakenowa.com" target="_blank" className="underline underline-offset-2">さけのわデータ</a>」を利用しています
        </p>
      </aside>
    </>
  );
}
