import * as React from 'react';
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Textarea } from "../../components/Textarea";
import { BrandSelector } from './components/BrandSelector';

export function Post() {
  const [brand, setBrand] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [signature, setSignature] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // APIのpostSchemaに合わせたペイロードを生成
    const payload = {
      user: { name: signature },
      brand: { name: brand, area_id: 1 }, // area_id は適切な値にするか、別途選択可能にする
      product: { name: product },
      message: message,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMsg(`投稿が成功しました (ID: ${data.postId})`);
      } else {
        setError(data.error || "投稿に失敗しました");
      }
    } catch (err) {
      console.error("Error posting:", err);
      setError("投稿に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <h2>日本酒</h2>
        {/* BrandSelector は value と onChange を props で受け取るようにする */}
        <BrandSelector
          placeholder="銘柄（例：八海山）"
          value={brand}
          onChange={(value: string) => setBrand(value)}
        />
        <TextField
          placeholder="造り（例：純米大吟醸 雪室貯蔵三年）"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <Textarea
          placeholder="どんな香り？どんな味わい？"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <TextField
          placeholder="署名"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "送信中..." : "投稿"}
        </Button>
        {error && <p className="text-red-600">{error}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}
      </div>
    </form>
  );
}
