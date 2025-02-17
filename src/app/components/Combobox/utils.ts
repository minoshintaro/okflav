export function filterList<T extends { id: number, name: string }>(
  list: T[],
  newItem: T,
  query: string
): T[] {
  if (query === '') return list.slice(0, 99);

  const matchedItem = list.find(item => item.name === query);
  const firstItem = matchedItem ?? newItem;

  const filteredList = list
    .filter(item => item.name.startsWith(query) && item.name !== query)
    .slice(0, 99);

  return [firstItem, ...filteredList];
}
