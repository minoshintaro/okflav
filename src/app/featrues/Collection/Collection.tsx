// import * as React from 'react';
import { useAtomValue } from 'jotai';
import { collectionAtom } from '../../../store/atom';

type CollectionProps = {
  category: string;
};

export function Collection({ category }: CollectionProps) {
  const data = useAtomValue(collectionAtom(category));  // Jotai からデータ取得

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Collection: {category}</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );

}
