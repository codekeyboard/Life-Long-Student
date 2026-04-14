import React from 'react'
import RightCard from './RightCard'

const RightContent = ({ cards }) => {
  return (
    <div className='h-full w-3/4 p-8 flex gap-6 overflow-x-auto'>
      {cards.map((card) => (
        <RightCard key={card.id} card={card} />
      ))}
    </div>
  )
}

export default RightContent
