// import * as React from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { PlusIcon } from '@heroicons/react/24/solid';
import { CircleButton } from '../app/components/CircleButton';
import { Header } from '../app/featrues/Header/Header';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="mx-auto max-w-420 px-4 pb-24">
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
        <nav className="fixed inset-x-0 bottom-4 mx-auto w-14">
          <Link to="/post">
            <CircleButton>
              <PlusIcon className="size-8" />
            </CircleButton>
          </Link>
        </nav>
        <aside>
          <p className="text-xs text-gray-400">
            ※「<a href="https://sakenowa.com" target="_blank">さけのわデータ</a>」を利用しています
          </p>
        </aside>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});

