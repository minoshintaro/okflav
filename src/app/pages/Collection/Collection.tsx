// import * as React from 'react';
import { useAtomValue } from 'jotai';
import { lineupAtom, collectionAtom } from '../../store/atom';
import { Detail } from '../Detail';

type CollectionProps = {
  category: string;
};

export function Collection({ category }: CollectionProps) {
  const lineup = useAtomValue(lineupAtom);
  const data = useAtomValue(collectionAtom(category));

  function findProduct(productId: number) {
    return lineup.find((item) => item.id === productId);
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{category}</h1>
      <div className="space-y-20 pb-20">
        {data.map((item) => (
          <section key="item.id">
            <Detail
              brandName={findProduct(item.productId)?.brandName ?? '無名'}
              productName={findProduct(item.productId)?.name ?? '無名'}
              area={findProduct(item.productId)?.area ?? '無名'}
              starColor={item.startColor}
              endColor={item.endColor}
              content={item.content}
              userName="名無し"
            />
          </section>
        ))}
      </div>
    </div>
  );

}
