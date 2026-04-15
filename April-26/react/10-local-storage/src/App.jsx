import React from 'react'

const App = () => {

  // localStorage.clear() // to clear the storage

  const user = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com'
  }

  localStorage.setItem('user',JSON.stringify(user))  // local storage save value in string format so we have to convert the object into string

  const storedUser = localStorage.getItem('user')

  console.log(JSON.parse(storedUser)) //it will convert to string to object

  // localStorage.removeItem('user') //used to remove 


  return (
    <div>

    </div>
  )
}

export default App
