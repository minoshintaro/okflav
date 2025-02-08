import * as React from 'react';
import * as Headless from '@headlessui/react';
// import { XCircleIcon } from '@heroicons/react/24/solid';

type ComboboxProps<T extends { id: number; name: string }> = {
  placeholder: string;
  list: T[];
  current: T | null;
  onCurrentChange: (value: T | null) => void;
};

export function Combobox<T extends { id: number; name: string }>({
  placeholder,
  list,
  current,
  onCurrentChange,
}: ComboboxProps<T>) {
  const [query, setQuery] = React.useState('');

  const filteredList = React.useMemo(() => {
    return query === ''
      ? list.slice(0, 100)
      : list.filter(item => item.name.includes(query));
  }, [list, query]);

  const handleCurrentChange = (item: T | null) => {
    onCurrentChange(item);
    setQuery(item?.name ?? '');
  };

  const handleClose = () => {
    if (query.length > 0) {
      const matchedItem = list.find(
        item => item.name.toLowerCase() === query.toLowerCase()
      );
      if (matchedItem) {
        onCurrentChange(matchedItem);
      } else {
        const newItem = { id: -1, name: query } as T;
        onCurrentChange(newItem);
      }
    }
    setQuery('');
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Headless.Combobox
        value={current} // 選択された値
        onChange={handleCurrentChange} // (value: T) => void
        onClose={handleClose} // () => void
      >
        <Headless.ComboboxInput
          placeholder={placeholder}
          displayValue={(item: T | null) => item?.name ?? ''} // (item: T) => string
          onChange={handleQueryChange} // (event: Event) => void
          className="rounded-full bg-gray-100 border border-gray-100 px-4 py-2"
        />
        <Headless.ComboboxOptions
          anchor="bottom start"
          className="w-fit rounded border bg-white space-y-1 p-1 empty:invisible"
        >
          {query.length > 0 && !(
            filteredList.length === 1 && filteredList[0].name === query
          ) && (
              <OriginalOption query={query} />
            )}
          {filteredList.map(item => (
            <ComboboxOption key={item.id} item={item} />
          ))}
        </Headless.ComboboxOptions>
      </Headless.Combobox>
    </>
  );
}

type ComboboxOptionProps<T extends { id: number; name: string }> = {
  item: T;
};
function ComboboxOption<T extends { id: number; name: string }>({ item }: ComboboxOptionProps<T>) {
  return (
    <Headless.ComboboxOption
      value={item}
      className="p-1 cursor-pointer data-[focus]:bg-blue-100"
    >
      {item.name}
    </Headless.ComboboxOption>
  );
}

type OriginalOptionProps = {
  query: string;
};
function OriginalOption({ query }: OriginalOptionProps) {
  return (
    <Headless.ComboboxOption
      value={{ id: -1, name: query }}
      className="p-1 cursor-pointer data-[focus]:bg-blue-100"
    >
      <span className="text-gray-500">{query}</span>
    </Headless.ComboboxOption>
  );
}
