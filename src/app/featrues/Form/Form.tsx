import * as React from 'react';

export function Form() {
  const [name, setName] = React.useState('');
  const [brandId, setBrandId] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!name || !brandId) {
      setMessage('商品名とブランドIDを入力してください');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          brand_id: parseInt(brandId, 10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'エラーが発生しました');
      }

      setMessage('商品が登録されました');
      setName('');
      setBrandId('');
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>製品情報の登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>商品名：</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="商品名を入力"
          />
        </div>
        <div>
          <label>ブランドID：</label>
          <input
            type="number"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            placeholder="ブランドIDを入力"
          />
        </div>
        <button type="submit">登録</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
