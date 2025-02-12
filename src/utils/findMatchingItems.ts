import { normalizeText } from "./normalizeText";

export function findMatchingItems(
  list: string[],
  target: string,
): string[] {
  if (!target) return [];

  const normalizedTarget = normalizeText(target);
  const matchedItems = list.filter((item) => normalizeText(item).startsWith(normalizedTarget));

  return matchedItems;
}
