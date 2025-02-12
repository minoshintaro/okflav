// import * as React from 'react';
import * as Headless from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type SearchFieldProps = {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchField({ placeholder, onChange }: SearchFieldProps) {
  return (
    <Headless.Field className="relative">
      <Headless.Label className="absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon title="検索" className="size-6" />
      </Headless.Label>
      <Headless.Input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="rounded-full bg-gray-100 border border-gray-100 pl-10 pr-4 py-2"
      />
    </Headless.Field>
  );
}
