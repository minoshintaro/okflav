import * as Headless from '@headlessui/react';

type TextareaProps = {
  placeholder?: string;
};

export function Textarea({ placeholder }: TextareaProps) {
  return (
    <Headless.Textarea
      placeholder={placeholder}
    />
  );
}
