import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}
export default App
