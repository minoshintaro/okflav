// import * as React from 'react';
import { TextField } from "../../components/TextField";
import { BrandSelector } from './components/BrandSelector';

export function Post() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2>日本酒</h2>
      <BrandSelector />
      <TextField placeholder="造り（例：純米大吟醸 雪室貯蔵三年）" />
    </div>
  );
}
