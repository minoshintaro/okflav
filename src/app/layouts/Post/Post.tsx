import * as React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom, sakenowaDataAtom, sakenowaBrandAtom } from '../../../store';
import { getData } from '../../../utils';
import { useSakenowaAtom } from '../../hooks/useSakenowaAtom';
import { Button } from '../../components/Button';
import { Combobox } from '../../components/Combobox';
import { Textarea } from '../../components/Textarea';
import { TextField } from '../../components/TextField';

export function Post() {
  // さけのわデータ
  const sakenowaData = useAtomValue(sakenowaDataAtom);
  const [sakenowaBrand, setSakenowaBrand] = useAtom(sakenowaBrandAtom);
  const sakenowaBrandDetails = useSakenowaAtom();

  // Turso

  const [brand, setBrand] = React.useState<Database.BrandData | null>(null);
  const [productList, setProductList] = React.useState<Database.ProductData[]>([]);
  const [targetProduct, setTargetProduct] = React.useState<Database.ProductData | null>(null);

  React.useEffect(() => {
    if (!sakenowaBrand) {
      setBrand(null);
      return;
    }
    getData<Database.BrandData[]>('/api/brands', { name: sakenowaBrand.name })
      .then(data => setBrand(data.length > 0 ? data[0] : null));
  }, [sakenowaBrand]);

  React.useEffect(() => {
    if (!brand) {
      setProductList([]);
      return;
    }
    getData<Database.ProductData[]>('/api/products', { brand_id: String(brand.id) })
      .then(data => setProductList(data.length > 0 ? data : []));
  }, [brand]);

  // Local
  const [message, setMessage] = React.useState<string>('');

  // User ==================================================

  const [user, setUser] = useAtom(userAtom);
  const [signature, setSignature] = React.useState<string>('');

  React.useEffect(() => {
    if (!signature) {
      setUser(null);
      return;
    }
    getData<Database.UserData[]>('/api/users', { name: signature })
      .then(data => setUser(data.length > 0 ? data[0] : null));
  }, [signature]);


  // 投稿処理
  const handleSubmit = async (event: React.FormEvent) => {
    // const payload = {
    //   user: { name: userName },
    //   brand: { area_id: area.id, name: brandName, furigana: '' },
    //   product: { brand_id: brandId, name: productName },
    //   post: { message }.
    // };
  };

  return (
    <>
      <p className="mb-4 text-sm">brandName: {sakenowaBrand?.name}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <Combobox
            placeholder="銘柄（例：八海山）"
            list={sakenowaData.brands}
            current={sakenowaBrand}
            onCurrentChange={setSakenowaBrand}
          />
          <Combobox
            placeholder="名称（例：純米大吟醸 雪室貯蔵三年）"
            list={productList}
            current={targetProduct}
            onCurrentChange={setTargetProduct}
          />
          <Textarea
            placeholder="感想"
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
      <aside className="mt-6 text-xs">
        <pre>Area: {JSON.stringify(sakenowaBrandDetails?.area, null, '  ')}</pre>
        <pre>Brand: {JSON.stringify(brand, null, '  ')}</pre>
        <pre>Product list: {JSON.stringify(productList, null, '  ')}</pre>
        <pre>Product: {JSON.stringify(targetProduct, null, '  ')}</pre>
        <pre>User: {JSON.stringify(user, null, '  ')}</pre>
      </aside>
    </>
  );
}
