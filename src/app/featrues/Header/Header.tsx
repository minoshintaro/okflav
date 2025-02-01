// import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { IconLink } from '../../components/IconLink';

export function Header() {
  return (
    <div className="flex justify-between items-center gap-2 py-2">
      <div>
        <IconLink to="/" icon="lineup" />
      </div>
      <Link to="/">
        <h1 className="text-lg font-mono">Okflav</h1>
      </Link>
      <div>
        <IconLink to="/collection/posts" icon="heart" />
      </div>
    </div>
  );
}
