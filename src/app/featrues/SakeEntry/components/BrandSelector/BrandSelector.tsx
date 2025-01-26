import * as React from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label } from '@headlessui/react'
import { normalizeText } from '../../../../../utils';
import type { Database } from '../../../../../types';

const brands: Database.Brand[] = [
  { id: 1, name: '八海山' },
  { id: 2, name: '鶴齢' },
  { id: 3, name: '七田' },
  { id: 4, name: 'あさ開' },
];

function findMatchingBrands(query: string): Database.Brand[] {
  if (!query) return brands;
  const normalized = normalizeText(query);
  return brands.filter((item) => normalizeText(item.name).startsWith(normalized));
}

export function BrandSelector() {
  const [selected, setSelected] = React.useState<Database.Brand | null>(null);
  const [query, setQuery] = React.useState<string>('');

  const filteredList = findMatchingBrands(query);

  return (
    <Field className="flex flex-col gap-y-1">
      <Label>銘柄</Label>
      <Combobox value={selected} onChange={setSelected} onClose={() => setQuery('')}>
        <ComboboxInput
          aria-label="Assignee"
          placeholder="銘柄を入力"
          displayValue={(brand: Database.Brand | null) => brand?.name || ''}
          onChange={(event) => setQuery(event.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
        />
        <ComboboxOptions
          anchor="bottom start"
          className="w-52 rounded border bg-white space-y-1 p-1 empty:invisible"
        >
          {query.length > 0 && (
            <ComboboxOption value={{ id: null, name: query }} className="data-[focus]:bg-blue-100">
              <span className="font-bold">"{query}"</span>
            </ComboboxOption>
          )}
          {filteredList.map((item) => (
            <ComboboxOption key={item.id} value={item} className="p-1 data-[focus]:bg-blue-100">
              {item.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
