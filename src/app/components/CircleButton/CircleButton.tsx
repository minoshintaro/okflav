// import * as React from 'react';
import { Link } from '@tanstack/react-router';

type CircleButtonProps = {
  to: string;
  children?: React.ReactNode;
};

export function CircleButton({ to, children }: CircleButtonProps) {
  return (
    <Link to={to} className="grid place-items-center rounded-full w-14 h-14 text-white bg-black hover:bg-amber-600 duration-200 transition-bg">
      {children}
    </Link>
  );
}

// <Headless.Button className="w-14 h-14 bg-black rounded-full grid place-items-center text-white">
//
//       </Headless.Button>
