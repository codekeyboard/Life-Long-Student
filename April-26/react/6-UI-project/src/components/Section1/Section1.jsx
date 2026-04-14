import React from 'react'
import Navbar from './Navbar'
import Content from './Content'

const Section1 = ({ cards }) => {
  return (
    <div className='h-screen w-full'>
      <Navbar />
      <Content cards={cards} />
    </div>
  )
}

export default Section1
