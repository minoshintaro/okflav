import * as React from 'react';
import * as Headless from '@headlessui/react';

type TextareaProps = {
  placeholder?: string;
  value?: string;
  onValueChange?: (input: string) => void;
};

export function Textarea({ placeholder = '', value = '', onValueChange }: TextareaProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange?.(event.target.value);
  };

  return (
    <Headless.Textarea
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="rounded-lg bg-gray-100 border border-gray-100 px-4 py-2 resize-none"
    />
  );
}
