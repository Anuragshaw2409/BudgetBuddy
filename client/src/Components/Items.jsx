import React from 'react'

function Items({title, subtitle, icon, amount}) {
  return (
    <>
    <div className='w-full h-auto flex justify-between px-2 py-2'>
        <div className='flex'>
            <div className='text-3xl mr-2'>{icon}</div>
            <div className='flex flex-col'>
                <div className='text-xl'>{title}</div>
                <div className='text-slate-600 text-xs'>{subtitle}</div>
            </div>
        </div>

        <div className='text-red-500'>₹-{amount}</div>



    </div>

    </>
  )
}

export default Items