import * as React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { sakenowaAtom, targetBrandAtom } from '../../../store';
import { useSakenowaAtom } from '../../hooks/useSakenowaAtom';
import { Button } from '../../components/Button';
import { Combobox } from '../../components/Combobox';
import { getData } from '../../../utils';

export function Post() {
  const { brands } = useAtomValue(sakenowaAtom);
  const [targetBrand, setTargetBrand] = useAtom(targetBrandAtom);

  const brandDetails = useSakenowaAtom();

  // 特定名称


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
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <Combobox
            placeholder="銘柄（例：八海山）"
            list={brands}
            current={targetBrand}
            onCurrentChange={setTargetBrand}
          />

        </div>



        <Button type="submit">投稿</Button>
      </form>
      <aside className="mt-6 text-xs">
        <pre>{JSON.stringify(targetBrand, null, '  ')}</pre>
        <pre>{JSON.stringify(brandDetails, null, '  ')}</pre>
      </aside>
    </>
  );
}
