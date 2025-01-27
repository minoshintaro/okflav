// import * as React from 'react';
import * as Headless from '@headlessui/react';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextField({ label, placeholder, onChange }: TextFieldProps) {
  return label ? (
    <Headless.Field className="flex flex-col gap-y-1">
      <Headless.Label className="text-sm font-medium text-gray-700">{label}</Headless.Label>
      <Headless.Input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="rounded border border-gray-300 px-3 py-2"
      />
    </Headless.Field>
  ) : (
    <Headless.Input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="rounded border border-gray-300 px-3 py-2"
    />
  );
}
