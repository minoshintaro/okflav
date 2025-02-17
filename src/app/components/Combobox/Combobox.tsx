import * as Headless from '@headlessui/react';
import { DUMMY_ID } from '../../../constants';
import { filterList } from './utils';

type ComboboxProps<T extends { id: number; name: string }> = {
  placeholder: string;
  query: string;
  list: T[];
  value: T | null;
  onQueryChange: (query: string) => void;
  onValueChange: (selection: T | null) => void;
};

export function Combobox<T extends { id: number; name: string }>({
  placeholder,
  query,
  list,
  value,
  onQueryChange,
  onValueChange,
}: ComboboxProps<T>) {
  const newItem = { id: DUMMY_ID, name: query } as T;
  const filteredList = filterList<T>(list, newItem, query);

  // Event handlers ==========================================

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleValueChange = (selection: T | null) => {
    onValueChange(selection);
  };

  const handleClose = () => {
    onQueryChange('');
  };

  return (
    <Headless.Combobox
      value={value}
      onChange={handleValueChange} // (value: T) => void
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
