import * as React from 'react';
import * as Headless from '@headlessui/react';

type TextareaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (input: string) => void;
};

export function Textarea({ placeholder = '', value = '', onChange }: TextareaProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
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
