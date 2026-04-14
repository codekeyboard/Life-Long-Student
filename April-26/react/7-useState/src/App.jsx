import React from 'react'
import { useState } from 'react'

const App = () => {

  const [num, setNum] = useState({ user: "Samir", age: 30 })

  // const handleIncrement = () => {
  //   setNum(num +1)
  // }

  // Destructuring the state object and creating a new object with the updated age value to avoid mutating the original state object directly, which is a common practice in React to ensure that state updates are handled correctly and efficiently.
  // const handleIncrement = () => {
  //   const newNum = { ...num, age : num.age +1}
  //   setNum(newNum)
  // }

  // Batch updates in React are a performance optimization technique that allows multiple state updates to be grouped together and processed in a single render cycle, rather than triggering a separate render for each individual update. This can help improve the performance of your application by reducing the number of renders and minimizing unnecessary re-renders. In the example above, we are using the functional form of setState to ensure that we are working with the most up-to-date state value when performing multiple updates in a batch.
  const handleIncrement = () => {
    //it does not work as below beacuse it update once not in batch  wrong example below
    // setNum(({age: num.age + 1 }))
    // setNum(({age: num.age + 1 }))
    // setNum(({age: num.age + 1 }))
    
    //working example below
    // it assigned the previous state value to prevNum and then creates a new object with the updated age value, which is then passed to setNum to update the state. This way, we ensure that we are working with the most up-to-date state value when performing multiple updates in a batch.
    setNum(prevNum => ({ ...prevNum, age: prevNum.age + 1 }))
    setNum(prevNum => ({ ...prevNum, age: prevNum.age + 1 }))
    setNum(prevNum => ({ ...prevNum, age: prevNum.age + 1 }))
  }

  return (
    <div>
      <h1>{num.user} is {num.age} years old.</h1>
      <button onClick={handleIncrement}>Increment</button>
    </div>  
  )
}

export default App
