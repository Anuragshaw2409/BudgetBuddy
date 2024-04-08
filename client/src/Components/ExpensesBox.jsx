import React from 'react'

function ExpensesBox({expense,trail}) {
  return (
    <div className='w-full flex h-full justify-center items-center flex-col '>
        <div>
        <h1 className='text-lg text-slate-400'>Spent this month</h1>
        </div>
        <div className='items-start flex gap-1 text-red-500'>

        <h1 className='text-4xl'>₹</h1>
        <h1 className='text-6xl'>-{expense}</h1>
        <h1 className='text-4xl'>.{trail}</h1>


        </div>
        
    </div>
  )
}

export default ExpensesBox