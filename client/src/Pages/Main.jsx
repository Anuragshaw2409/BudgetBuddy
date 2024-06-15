import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { expenseEntryAtom } from '../Store/Modal';

function Main() {
  const navigate = useNavigate();
  const setExpenseModal = useSetRecoilState(expenseEntryAtom);
  return (
    <>
    <Outlet/>
    <div className='h-14 w-full flex justify-between fixed bottom-0 px-5 items-center text-2xl text border-t text-blue-600'>
      <div><i className="fa-solid fa-chart-column cursor-pointer" onClick={()=>navigate('/app/summary')}></i></div>
      <div><i className="fa-solid fa-circle-plus text-yellow-400 text-5xl cursor-pointer" onClick={()=>{
        navigate('/app/expenses');
        setExpenseModal(true);
      }}></i></div>
      <div><i className="fa-solid fa-calendar-days cursor-pointer"></i></div>


    </div>
    </>
  )
}

export default Main