import React from 'react'
import { useEffect } from 'react'

const App = () => {
  
  const [count, setCount] = React.useState(0)

  //useeffect in this seesion depends on count, it will run only when count changes, and it will run after the first render, and after every render when count changes

  // when to use useEffect:
  // 1. to fetch data from an API
  // 2. to subscribe to an event
  // 3. to set up a timer
  // 4. to perform side effects in a component
  
  useEffect(() => {
    console.log('useEffect called')
  }, [count])
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}

export default App
