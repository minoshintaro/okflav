import * as React from 'react';
import { useAtomValue } from 'jotai';
import { sakenowaAreaAtom, sakenowaBrandListAtom } from '../../../store/atom';
import { Button } from '../../components/Button';
import { BrandSelector } from '../../featrues/BrandSelector';

export function Post() {

  const [brandName, setBrandName] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [areaId, setAreaId] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const [userName, setUserName] = React.useState('無名');

  const areaList = useAtomValue(sakenowaAreaAtom);
  const brandList = useAtomValue(sakenowaBrandListAtom);
  function findAreaData(name: string): Sakenowa.Area {
    const brandData: Sakenowa.Brand = brandList.find((brand) => brand.name === name);
    return
  }

  const handleSubmit = async (event: React.FormEvent) => {
    const payload = {
      user: { name: userName },
      brand: { area_id: areaId, name: brandName, furigana: '' },
      product: { brand_id: brandId, name: productName },
      post: { message }.
    };
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <BrandSelector placeholder="銘柄（例：八海山）" value={brandName} onChange={setBrandName} />
        </div>
        <Button type="submit">投稿</Button>
      </form>
    </>
  );
}
