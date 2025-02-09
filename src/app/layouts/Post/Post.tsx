import * as React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { sakenowaDataAtom, selectedBrandAtom, selectedProductAtom, activeUserAtom } from '../../../store';
import { getData } from '../../../utils';
import { Button } from '../../components/Button';
import { Combobox } from '../../components/Combobox';
import { Textarea } from '../../components/Textarea';
import { TextField } from '../../components/TextField';
import { getBrandDetails } from './getBrandDetails';
import { submitPost } from './submitPost';

export function Post() {
  // さけのわデータ
  const sakenowaData = useAtomValue(sakenowaDataAtom);

  // Brand =================================================

  const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandAtom);
  const [brand, setBrand] = React.useState<Sakenowa.Brand | null>(null);
  const [area, setArea] = React.useState<Sakenowa.Area | null>(null);
  const [productList, setProductList] = React.useState<Turso.ProductData[]>([]);

  React.useEffect(() => {
    if (!brand) {
      setSelectedBrand(null);
      setArea(null);
      return;
    }
    getData<Turso.BrandData[]>('/api/brands', { name: brand.name })
      .then(rows => setSelectedBrand(rows.length > 0 ? rows[0] : null));

    const brandDetails = getBrandDetails(sakenowaData, brand);
    if (brandDetails) {
      setArea(brandDetails.area);
    }
  }, [brand]);

  React.useEffect(() => {
    if (!selectedBrand) {
      setProductList([]);
      return;
    }
    getData<Turso.ProductData[]>('/api/products', { brand_id: String(selectedBrand.id) })
      .then(rows => setProductList(rows.length > 0 ? rows : []));
  }, [selectedBrand]);

  // Product =================================================

  const [selectedProduct, setSelectedProduct] = useAtom(selectedProductAtom);
  const [product, setProduct] = React.useState<Turso.ProductData | null>(null);

  React.useEffect(() => {
    if (!product) {
      setSelectedProduct(null);
      return;
    }
    const matchedProduct = productList.find(row => row.name === product.name);
    setSelectedProduct(matchedProduct || null);
  }, [product]);

  // User ==================================================

  const [activeUser, setActiveUser] = useAtom(activeUserAtom);
  const [signature, setSignature] = React.useState<string>('');

  React.useEffect(() => {
    if (!signature) {
      setActiveUser(null);
      return;
    }
    getData<Turso.UserData[]>('/api/users', { name: signature })
      .then(rows => setActiveUser(rows.length > 0 ? rows[0] : null));
  }, [signature]);

  // Post ==================================================

  const [message, setMessage] = React.useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!brand || !area || !product || !message || !signature) {
      alert('未選択の項目があります');
      return;
    }

    await submitPost({
      selectedBrand,
      selectedProduct,
      activeUser,
      brand,
      area,
      product,
      message,
      signature,
    });
  };

  return (
    <>
      <details open className="mb-4 text-xs">
        <summary>Debug</summary>
        <pre>Brand: {JSON.stringify(brand)} <span className="text-blue-600">{JSON.stringify(selectedBrand, null, '  ')}</span></pre>
        <pre>Area: {JSON.stringify(area)}</pre>
        <pre>Products: <span className="text-blue-600">{JSON.stringify(productList, null, '  ')}</span></pre>
        <pre>Product: {JSON.stringify(product)} <span className="text-blue-600">{JSON.stringify(selectedProduct, null, '  ')}</span></pre>
        <pre>User: {JSON.stringify(signature)} <span className="text-blue-600">{JSON.stringify(activeUser, null, '  ')}</span></pre>
      </details>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Combobox
            placeholder="銘柄（例：八海山）"
            list={sakenowaData.brands}
            current={brand}
            onCurrentChange={setBrand}
          />
          <Combobox
            placeholder="名称（例：純米大吟醸 雪室貯蔵三年）"
            list={productList}
            current={product}
            onCurrentChange={setProduct}
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
