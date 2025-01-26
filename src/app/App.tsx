// import * as React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { SakeEntry } from './featrues/SakeEntry';
import { CommentPost } from './featrues/CommentPost';
import { CircleButton } from './components/CircleButton';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="text-2xl font-mono">Okflav</h1>
      </header>
      <main>
        <SakeEntry />
        <CommentPost />
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
