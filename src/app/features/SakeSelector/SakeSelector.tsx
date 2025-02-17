import * as React from 'react';
// import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { DUMMY_ID } from '../../../constants';
import { postingBrandDataAtom, postingProductDataAtom } from '../../store';
import { useSakenowaData, useBrandData, useProductList, usePostData } from '../../hooks';
import { Combobox } from '../../components/Combobox';

type SakeSelectorProps = {
  onCachedBrandChange: (brand: Sakenowa.Brand | null) => void;
  onCachedProductChange: (product: Turso.ProductData | null) => void;
};

export function SakeSelector() {
  // 入力クエリ
  const [brandQuery, setBrandQuery] = React.useState('');
  const [productQuery, setProductQuery] = React.useState('');

  // 選択状況
  const [selectedBrand, setSelectedBrand] = React.useState<Sakenowa.Brand | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<Turso.ProductData | null>(null);

  // データ
  const sakenowaData = useSakenowaData();
  const cachedBrandData = useBrandData(selectedBrand?.name ?? null).data;
  const cachedProductList = useProductList(postingBrandData?.id ?? null).data;

  return (
    <div className="space-y-4">
      <Combobox
        placeholder="銘柄（例：八海山）"
        query={brandQuery}
        list={sakenowaData.brands}
        value={selectedBrand}
        onQueryChange={setBrandQuery}
        onValueChange={setSelectedBrand}
      />
      <Combobox
        placeholder="名称（例：純米大吟醸 雪室貯蔵三年）"
        query={productQuery}
        list={cachedProductList ?? []}
        value={selectedProduct}
        onQueryChange={setProductQuery}
        onValueChange={setSelectedProduct}
      />
    </div>
  );
}

