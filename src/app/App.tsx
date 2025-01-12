import { useState, useEffect } from 'react'
import { Button } from './components/Button/Button'
import { setFetchedData } from './utils/setFetchedData'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    setFetchedData('sakenowa', setText);
  }, []);

  return (
    <>
      <div className="flex">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{text}</h1>
      <div className="card">
        <Button />
      </div>
    </>
  )
}

export default App
