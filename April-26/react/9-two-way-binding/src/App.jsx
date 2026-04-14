

import React from 'react'

const App = () => {

  const [title, setTitle] = React.useState('');

  const handleSubmit = (e) => {
    // we have to prevent the default behavior of the form which is to refresh the page when the form is submitted
    e.preventDefault();
    console.log('Form submitted');
    setTitle('');
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder='Username' 
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default App

