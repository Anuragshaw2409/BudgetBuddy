import React from 'react'

function SummaryExpense({expense, trail}) {
  return (
    <div className='w-full flex h-full flex-col px-4 mt-2'>
        <div>
        </div>
        <div className='items-start flex gap-1 text-red-500'>

        <h1 className='text-2xl'>₹</h1>
        <h1 className='text-2xl'>-{expense}</h1>
        <h1 className='text-xl'>.{trail}</h1>


        </div>
        <h1 className='text-base text-slate-400'>Total spent this month</h1>
        
    </div>
  )
}

export default SummaryExpense