// import * as React from 'react';
import { useAtomValue } from 'jotai';
import { useSakenowaData } from '../../hooks';
import { lineupAtom } from '../../store/atom';
import { SearchField } from "../../components/SearchField";

export function Lineup() {
  const products = useAtomValue(lineupAtom);
  const { areas, breweries, brands, isLoading, isError } = useSakenowaData();

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <SearchField placeholder="銘柄" />
      </div>
      <div className="flex flex-row-reverse flex-wrap justify-start gap-x-4 gap-y-8 mx-auto size-fit">
        {products.map((product) => (
          <a href="#" key={product.id} className="flex flex-row font-mincho items-center [writing-mode:vertical-rl]">
            <p className="text-4xl">{product.brandName}</p>
            <p className="mt-4 text-xl">{product.name}</p>
            <p className="text-xl">（{product.area}）</p>
          </a>
        ))}
      </div>
      <pre className="text-xs">
        {JSON.stringify({ areas, breweries, brands, isLoading, isError }, null, 2)}
      </pre>
    </div>
  );
}
