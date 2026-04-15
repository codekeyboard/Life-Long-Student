import React from 'react'

// using fetch API to call the API and get the data from the API and display it in the console

const App = () => {


  const [data, setData] = React.useState(null)

  const getData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/')
      const jsonData = await response.json()
      console.log(jsonData)
      setData(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div>
      <h1>Hello</h1>
       <button onClick={getData}>Get Data</button>
       <h1>Data</h1>
       {data && data.map((item) => (
         <div key={item.id}>
           <h2>{item.title}</h2>
           <p>{item.body}</p>
         </div>
       ))}
    </div>
    
  )
}


export default App
