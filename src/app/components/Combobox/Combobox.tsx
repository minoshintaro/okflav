import * as React from 'react';
import * as Headless from '@headlessui/react';
import { useDebouncedValue } from '../../hooks';
import { normalizeText } from '../../../utils';

type ComboboxProps<T extends { id: number; name: string }> = {
  value: T | null;
  options: T[];
  placeholder?: string;
  onChange?: (value: T | null) => void;
};

export function Combobox<T extends { id: number; name: string }>({
  value,
  options,
  placeholder = '',
  onChange = () => {},
}: ComboboxProps<T>) {
  const [query, setQuery] = React.useState<string>('');
  const debouncedQuery = useDebouncedValue(query, 500);

  const filteredOptions = React.useMemo(() => {
    return debouncedQuery ? options.filter(option => {
      return normalizeText(option.name).includes(normalizeText(debouncedQuery));
    }) : options;
  }, [options, debouncedQuery]);

  return (
    <Headless.Combobox value={value} onChange={onChange} onClose={() => setQuery('')}>
      <Headless.ComboboxInput
        placeholder={placeholder}
        displayValue={(item: T | null) => item ? item.name : query}
        onChange={(event) => setQuery(event.target.value)}
        className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
      />
      <Headless.ComboboxOptions
        anchor="bottom start"
        className="w-52 rounded border bg-white space-y-1 p-1 empty:invisible"
      >
        {filteredOptions.length === 0 ? (
          <Headless.ComboboxOption value={{ id: -1, name: query }} className="data-[focus]:bg-blue-100">
            <span className="font-bold">"{query}"</span>
          </Headless.ComboboxOption>
        ) : (
          filteredOptions.map((item) => (
            <Headless.ComboboxOption
              key={item.id}
              value={item}
              className="p-1 cursor-pointer data-[focus]:bg-blue-100"
            >
              {item.name}
            </Headless.ComboboxOption>
          ))
        )}
      </Headless.ComboboxOptions>
    </Headless.Combobox>
  );
}
