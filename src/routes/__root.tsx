// import * as React from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { PlusIcon } from '@heroicons/react/24/solid';
import { CircleButton } from '../app/components/CircleButton';
import { Header } from '../app/featrues/Header/Header';

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="sticky top-0 z-10">
        <Header />
      </header>
      <main className="mx-auto max-w-[640px] px-6">
        <Outlet />
      </main>
      <nav className="fixed inset-x-0 bottom-4 mx-auto w-14">
        <CircleButton to="/post">
          <PlusIcon className="size-8" />
        </CircleButton>
      </nav>
      <TanStackRouterDevtools />
    </>
  ),
});

