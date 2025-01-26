// import * as React from 'react';
import * as Headless from '@headlessui/react';

type CircleButtonProps = {
  children?: React.ReactNode;
};

export function CircleButton({ children }: CircleButtonProps) {
  return (
    <>
      <Headless.Button className="w-14 h-14 bg-black rounded-full grid place-items-center text-white">
        {children}
      </Headless.Button>
    </>
  )
}
