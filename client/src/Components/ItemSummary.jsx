import React from 'react'

function ItemSummary({amount, title, subtitle, icon}) {
  return (
    <>
        <div className='flex flex-row w-full justify-between h-12 px-2 py-1 shadow-md rounded-lg mt-1 border-t'>
            <div className='flex'>
                <div className='text-2xl h-10 w-10 text-center bg-yellow-300 rounded-full mr-2 p-1'>
                    <i class={`fa-solid ${icon} text-slate-500`} ></i>
                </div>
                <div>
                    <div>{title}</div>
                    <div className='text-xs'>{subtitle}</div>
                </div>
            </div>
            <div>
                <h1 className='text-red-500'>-₹{amount}</h1>
            </div>

        </div>

    </>
  )
}

export default ItemSummary