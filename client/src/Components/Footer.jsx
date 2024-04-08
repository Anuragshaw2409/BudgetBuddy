import React from 'react'
import logo from '../assets/Images/logo.png'

function Footer() {
  return (
    <>
    <div className="footer bg-slate-800 h-28 w-full bottom-0 p-2 flex justify-between absolute">

<div className="image h-full flex items-center ">
  <img src={logo} alt="" className='h-[70%] ' />
</div>
<div className='flex flex-col w-[40%] gap-3'>
  <div><h1 className='text-slate-300 text-xl'>Follow me on:</h1></div>
  <div className='flex gap-4 text-4xl text-slate-300'>
    <a href="https://github.com/Anuragshaw2409" target='_blank'><i className="fa-brands fa-github hover:text-slate-500 cursor-pointer" ></i></a>
    <a href="https://linkedin.com/in/anuragshaw2409" target='_blank'>

      <i className="fa-brands fa-linkedin hover:text-slate-500 cursor-pointer"></i>
    </a>
    <a href="https://instagram.com/anurag_24_09/" target='_blank'>

      <i className="fa-brands fa-instagram hover:text-slate-500 cursor-pointer"></i>
    </a>
  </div>

</div>
</div>
    </>
  )
}

export default Footer