import * as React from 'react';
import * as Headless from '@headlessui/react';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export function Button({ children, type = 'button', disabled }: ButtonProps) {
  return (
    <>
      <Headless.Button
        type={type}
        disabled={disabled}
        className="rounded border px-4 py-2 hover:text-amber-600 duration-200 transition-text"
      >
        {children}
      </Headless.Button>
    </>
  );
}
