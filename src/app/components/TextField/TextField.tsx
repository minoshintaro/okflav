// import * as React from 'react';
import * as Headless from '@headlessui/react';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextField({ placeholder, onChange }: TextFieldProps) {
  return (
    <Headless.Input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="rounded border border-gray-300 px-3 py-2"
    />
  );
}
