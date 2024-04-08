import React from 'react'

function SpentDayWise({day, totalspent}) {
  return (
    <>
    <div className='w-full h-auto flex justify-between px-4 text-slate-400'>
        <div>{day}</div>
        <div>₹-{totalspent}</div>
    </div>
    </>
  )
}

export default SpentDayWise