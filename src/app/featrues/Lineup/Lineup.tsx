// import * as React from 'react';
import { useAtomValue } from 'jotai';
import { lineupAtom } from '../../../store/atom';
import { SearchField } from "../../components/SearchField";

export function Lineup() {
  const products = useAtomValue(lineupAtom);

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <SearchField placeholder="銘柄" />
      </div>
      <div className="flex flex-row-reverse justify-center gap-4">
        {products.map((product) => (
          <a href="#" key={product.id} className="flex flex-row font-mincho items-center [writing-mode:vertical-rl]">
            <p className="text-4xl">{product.brandName}</p>
            <p className="mt-4 text-xl">{product.name}</p>
            <p className="text-xl">（{product.area}）</p>
          </a>
        ))}
      </div>
    </div>
  );
}
