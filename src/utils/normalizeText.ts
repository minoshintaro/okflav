export function normalizeText(text: string): string {
  return text
    .trim() // 両端空白を削除
    .toLowerCase() // すべての英字を小文字に
    .replace(/[\u30a1-\u30f6]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0x60)); // カタカナをひらがなに
}
