import { normalizeText } from "./normalizeText";

type Data = Record<string, any>;

export function filterByQuery<T extends Data>(
  items: T[],
  key: keyof T,
  query: string,
): T[] {
  if (!query) return items;
  const normalized = normalizeText(query);
  return items.filter((item) =>
    normalizeText(String(item[key])).startsWith(normalized)
  );
}
