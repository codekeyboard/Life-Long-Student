import React from 'react'
import { ArrowRight } from 'lucide-react'

const RightCardContent = ({ card }) => {
  return (
    <div className='absolute top-0 left-0 h-full w-full p-8 flex flex-col justify-between'>
        <h2 className='bg-white w-14 h-14 text-2xl rounded-full justify-center items-center flex font-semibold'>{card.number}</h2>  
        <div>
          <p className='text-lg leading-normal text-white mb-13 font-semibold '>{card.description}</p>
          <div className='flex justify-between'>
            <button className='bg-blue-600 py-2 px-8 rounded-full font-bold text-white'>{card.title}</button>
            <button className='bg-blue-600 py-2 px-3 rounded-full'><ArrowRight /></button>
          </div>
        </div>
        
      </div>
  )
}

export default RightCardContent
