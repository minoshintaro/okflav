// import * as React from 'react';
import { useAtomValue } from 'jotai';
import { collectionAtom } from '../../../store/atom';
import { Detail } from '../Detail';

type CollectionProps = {
  category: string;
};

export function Collection({ category }: CollectionProps) {
  const data = useAtomValue(collectionAtom(category));  // Jotai からデータ取得

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Collection: {category}</h1>
      {data.map((item) => (
        <section key="item.id">
          <Detail
            brandName={item.brandName}
            productName={item.name}
            area={item.area}
            starColor={item.startColor}
            endColor={item.endColor}
            content={item.content}
            userName="名無し"
          />
        </section>
      ))}
    </div>
  );

}
