import { useState } from 'react';

export function Button() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <>
      <button className="border px-4 py-2" onClick={handleClick}>
        count is {count}
      </button>
    </>
  )
}
