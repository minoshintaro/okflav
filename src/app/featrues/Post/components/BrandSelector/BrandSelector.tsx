import * as React from 'react';
import { useAtomValue } from 'jotai';
import { normalizeText } from '../../../../../utils';
import { sakenowaBrandListAtom } from '../../../../../store/atom';
import { useDebouncedValue } from '../../../../hooks';
import { Combobox } from '../../../../components/Combobox';

function filterOptions<T extends { id: number; name: string }>(
  options: T[],
  query: string
): T[] {
  if (query === '') return options.slice(0, 100);

  return options.filter(option => (
    normalizeText(option.name).includes(normalizeText(query))
  ));
}

type BrandSelectorProps = {
  placeholder: string;
  value?: Sakenowa.Brand | null;
  onChange?: (value: Sakenowa.Brand | null) => void;
};

export function BrandSelector({ placeholder, value, onChange }: BrandSelectorProps) {
  const brandList = useAtomValue(sakenowaBrandListAtom);

  const [query, setQuery] = React.useState<string>('');
  const debouncedQuery = useDebouncedValue(query, 300);

  const filteredOptions = React.useMemo(() => {
    return filterOptions(brandList, debouncedQuery);
  }, [brandList, debouncedQuery]);

  const handleChange = (value: Sakenowa.Brand | null) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      <Combobox
        value={value}
        options={filteredOptions}
        query={query}
        placeholder={placeholder}
        onValueChange={handleChange}
        onQueryChange={setQuery}
      />
    </>
  );
}
