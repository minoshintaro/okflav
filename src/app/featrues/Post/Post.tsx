// import * as React from 'react';
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Textarea } from "../../components/Textarea";
import { BrandSelector } from './components/BrandSelector';

export function Post() {
  return (
    <div className="flex flex-col gap-y-2">
      <h2>日本酒</h2>
      <BrandSelector placeholder="銘柄（例：八海山）" />
      <TextField placeholder="造り（例：純米大吟醸 雪室貯蔵三年）" />
      <Textarea placeholder="どんな味わい？" />
      <TextField placeholder="署名" />
      <Button />
    </div>
  );
}
