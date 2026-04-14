import React from 'react'
import RightCardContent from './RightCardContent'

const RightCard = ({ card }) => {
  return (
    <div className='h-full min-w-80 w-80 relative rounded-4xl overflow-hidden'>
      <img src={card.image} alt={card.title} className='h-full w-full object-cover' />
      <RightCardContent card={card} />
    </div>
  )
}

export default RightCard
