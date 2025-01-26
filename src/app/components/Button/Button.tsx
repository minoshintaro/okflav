import * as React from 'react';
import * as Headless from '@headlessui/react';

export function Button() {
  const [count, setCount] = React.useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <>
      <Headless.Button className="rounded border px-4 py-2" onClick={handleClick}>
        count is {count}
      </Headless.Button>
    </>
  )
}
