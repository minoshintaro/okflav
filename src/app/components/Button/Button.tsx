import * as React from 'react';
import * as Headless from '@headlessui/react';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export function Button({ children, type = 'button' }: ButtonProps) {
  return (
    <>
      <Headless.Button
        type={type}
        className="rounded border px-4 py-2 hover:text-amber-600 duration-200 transition-text"
      >
        {children}
      </Headless.Button>
    </>
  );
}
