import * as React from 'react';
import * as Headless from '@headlessui/react';

type TextFieldProps = {
  placeholder?: string;
  value?: string;
  onChange?: (input: string) => void;
};

export function TextField({ placeholder = '', value = '', onChange }: TextFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <Headless.Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="rounded-full bg-gray-100 border border-gray-100 px-4 py-2"
    />
  );
}
