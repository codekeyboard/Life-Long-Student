import React from 'react'

const App = () => {

  const handleSubmit = (e) => {
    // we have to prevent the default behavior of the form which is to refresh the page when the form is submitted
    e.preventDefault();
    console.log('Form submitted');
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App