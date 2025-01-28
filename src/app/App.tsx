// import * as React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Collection } from './featrues/Collection';
import { Detail } from './featrues/Detail';
import { Post } from './featrues/Post';
import { CircleButton } from './components/CircleButton';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="text-xl font-mono">Okflav</h1>
      </header>
      <main className="space-y-4">
        <hr />
        <Collection />
        <hr />
        <Detail />
        <hr />
        <Post />
      </main>
      <footer className="footMenu">
        <CircleButton>
          <PlusIcon className="size-8" />
        </CircleButton>
      </footer>
    </div>
  );
}

export default App;
