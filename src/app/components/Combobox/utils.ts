export function filterList<T extends { name: string }>(list: T[], query: string): T[] {
  if (query === '') return list.slice(0, 100);
  return list.filter(item => item.name.includes(query));
}
