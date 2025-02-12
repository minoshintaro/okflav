import * as React from 'react';
import * as Headless from '@headlessui/react';
import { DUMMY_ID } from '../../../constants';
import { filterList } from './utils';

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
  const filteredList = filterList<T>(list, query);

  // Event handlers ==========================================

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleCurrentChange = (item: T | null) => {
    onCurrentChange(item);
  };

  const handleClose = () => {
    setQuery('');
  };

  return (
    <Headless.Combobox
      value={current}
      onChange={handleCurrentChange} // (value: T) => void
      onClose={handleClose} // () => void
      immediate={true}
    >
      <Headless.ComboboxInput
        placeholder={placeholder}
        displayValue={(item: T | null) => item?.name ?? ''} // (item: T | null) => string
        onChange={handleQueryChange} // (event: Event) => void
        autoComplete="off"
        className="rounded-full bg-gray-100 border border-gray-100 px-4 py-2"
      />
      <Headless.ComboboxOptions
        anchor="bottom start"
        className="w-fit rounded border bg-white space-y-1 p-1 empty:invisible"
      >
        {filteredList.map(item => (
          <Headless.ComboboxOption
            key={item.id}
            value={item}
            className="p-1 cursor-pointer focus:bg-blue-100"
          >
            {item.id === DUMMY_ID ? <span className="text-gray-500">{item.name}</span> : item.name}
          </Headless.ComboboxOption>
        ))}
      </Headless.ComboboxOptions>
    </Headless.Combobox>
  );
}
