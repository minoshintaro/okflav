import * as React from 'react';
import { useAtomValue } from 'jotai';
import { sakenowaBrandListAtom } from '../../../../store/atom';
import { Combobox } from '../../../../components/Combobox';

export function BrandSelector() {
  // Global states
  const brandList = useAtomValue(sakenowaBrandListAtom);

  // Local states
  const [selected, setSelected] = React.useState<Sakenowa.Brand | null>(null);

  const handleChange = (value: Sakenowa.Brand | null) => {
    setSelected(value);
  };

  return (
    <>
      <Combobox
        value={selected}
        options={brandList}
        placeholder="銘柄（例：八海山）"
        onChange={handleChange}
      />
      {brandList.map((brand) => (
        <div key={brand.id}>{brand.name}</div>
      ))}
    </>
  );
}
