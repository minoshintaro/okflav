import { DUMMY_ID } from "../../../constants";

export function filterList<T extends { id: number, name: string }>(list: T[], query: string): T[] {
  if (query === '') return list.slice(0, 99);

  const matchedItem = list.find(item => item.name === query);
  const filteredList = list
    .filter(item => item.name.startsWith(query) && item.name !== query)
    .slice(0, 99);

  const firstItem = matchedItem ?? { id: DUMMY_ID, name: query } as T;

  return [firstItem, ...filteredList];
}
