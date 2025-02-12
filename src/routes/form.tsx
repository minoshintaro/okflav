import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../app/components/Button'
import { TextField } from '../app/components/TextField'

export const Route = createFileRoute('/form')({
  component: RouteComponent,
})

function RouteComponent() {
  const [brandName, setBrandName] = React.useState('');
  const [areaId, setAreaId] = React.useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // フォームのデフォルト送信を防ぐ

    try {
      const response = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area_id: areaId, name: brandName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '送信に失敗しました');
      }

      alert('データを送信しました');
    } catch (error) {
      console.error(error);
      alert('エラー');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <TextField placeholder="銘柄" value={brandName} onValueChange={setBrandName} />
      <TextField placeholder="地域" value={areaId} onValueChange={setAreaId} />
      <Button type="submit">送信</Button>
    </form>
  );
}
