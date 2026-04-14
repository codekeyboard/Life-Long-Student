import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Content = ({ cards }) => {
  return (
    <div className='py-4 px-15 flex items-center gap-10 h-[90vh]'>
      <LeftContent />
      <RightContent cards={cards} />
      
    </div>
  )
}

export default Content
 
