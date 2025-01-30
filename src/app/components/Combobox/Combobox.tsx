// import * as React from 'react';
import * as Headless from '@headlessui/react';

type ComboboxProps<T extends { id: number; name: string }> = {
  value: T | null;
  options: T[];
  query: string;
  placeholder: string;
  onValueChange: (value: T | null) => void;
  onQueryChange: (query: string) => void;
};

export function Combobox<T extends { id: number; name: string }>({
  value,
  options,
  query,
  placeholder,
  onValueChange,
  onQueryChange,
}: ComboboxProps<T>) {

  const handleDisplayValue = (option: T | null): string => {
    if (option) return option.name;
    if (query.length > 0) return query;
    return '';
  };

  return (
    <Headless.Combobox value={value} onChange={onValueChange} onClose={() => onQueryChange('')}>
      <Headless.ComboboxInput
        placeholder={placeholder}
        displayValue={handleDisplayValue}
        onChange={(event) => onQueryChange(event.target.value)}
        className="rounded-full bg-gray-100 border border-gray-100 px-4 py-2"
      />
      <Headless.ComboboxOptions
        anchor="bottom start"
        className="w-52 rounded border bg-white space-y-1 p-1 empty:invisible"
      >
        {options.length > 0 ? (
          options.map((option) => (
            <Headless.ComboboxOption
              key={option.id}
              value={option}
              className="p-1 cursor-pointer data-[focus]:bg-blue-100"
            >
              {option.name}
            </Headless.ComboboxOption>
          ))
        ) : (
          <Headless.ComboboxOption
            value={{ id: -1, name: query }}
            className="data-[focus]:bg-blue-100"
          >
            <span className="font-bold">"{query}"</span>
          </Headless.ComboboxOption>
        )}
      </Headless.ComboboxOptions>
    </Headless.Combobox>
  );
}
