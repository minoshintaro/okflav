// import * as React from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="container">
        <header>
          <h1>Oklch</h1>
        </header>
        <main>
          <Outlet />
        </main>
        <nav>
          <Link to="/about">
            Post
          </Link>
        </nav>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});

// <>
// <div className="p-2 flex gap-2">
//   <Link to="/" className="[&.active]:font-bold">
//     Home
//   </Link>{' '}
//   <Link to="/about" className="[&.active]:font-bold">
//     About
//   </Link>
// </div>
// <hr />
// <Outlet />
//
// </>
