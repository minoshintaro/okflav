// import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Bars4Icon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/solid';

export function Header() {
  return (
    <div className="flex justify-between items-center gap-2 py-2">
      <div>
        <Link to="/" className="hover:text-amber-400 duration-200 transition-colors">
          <Bars4Icon className="size-6 rotate-90 origin-center" />
        </Link>
      </div>
      <Link to="/">
        <h1 className="text-lg font-mono">Okflav</h1>
      </Link>
      <div>
      <Link to="/collection/posts" className="hover:text-amber-400 duration-200 transition-colors">
          <HeartIcon className="size-6" />
        </Link>
      </div>
    </div>
  );
}
