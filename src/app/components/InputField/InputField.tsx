// import * as React from 'react';
import * as Headless from '@headlessui/react';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  onInput?: () => string;
};

export function InputField({ label, placeholder, onInput }:InputFieldProps ) {
  return (
    <Headless.Field className="flex flex-col gap-y-1">
      <Headless.Label>{label}</Headless.Label>
      <Headless.Input
        type="text"
        placeholder={placeholder}
        className="rounded border border-gray-300 px-3 py-2"
        onInput={onInput}
      />
    </Headless.Field>
  );
}
