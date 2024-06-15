import React, { useEffect, useState } from 'react'
import TopBar from '../Components/TopBar'
import ExpensesBox from "../Components/ExpensesBox"
import SpentDayWise from '../Components/SpentDayWise'
import Items from '../Components/Items'
import ExpenseEntry from '../Components/ExpenseEntry'
import axios from 'axios'
import { url } from '../util/clientUrl'
import { useNavigate } from 'react-router-dom'





function Expenses() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [data, setData] = useState({contents:{TotalSpent:0}});

   function getData() {
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
       axios.post(`${url}/api/v1/expense/monthly`, {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          }
        }).then((res)=>
       { const data = res.data;
        console.log(data);
        setData(data);}
      )
    } catch (error) {

      return <div> There might be some problem loading the expenses</div>

      
    }
    
  }

  useEffect(()=>{getData()}, []);
  
  // return <div><div className="lds-ripple w-full h-screen flex justify-center items-center"><div></div><div></div></div></div>

  return (
    <div className='relative'>

      <TopBar label={"Expenses"} />
      {!data && <div><div className="lds-ripple w-full h-screen flex justify-center items-center"><div></div><div></div></div></div>}
     {data && <>
     <div className='expense-box w-full h-56'>
        <ExpensesBox expense={data.length!=0?data.contents.TotalSpent:0} trail={"00"} />

      </div>

      <div className='All-expenses w-full'>

        
        <SpentDayWise day="Today" totalspent={"750.00"} />
        <Items title="Vacation" subtitle="02:01 PM" icon="🏖️" amount="80.00" />
        <Items title="Medicine" subtitle="04:01 PM" icon="💊" amount="100.00" />
        <Items title="Vacation" subtitle="02:01 PM" icon="🏖️" amount="80.00" />
        <Items title="Vacation" subtitle="02:01 PM" icon="🏖️" amount="80.00" />
        <Items title="Vacation" subtitle="02:01 PM" icon="🏖️" amount="80.00" />
      </div>
     </> }
     
      <ExpenseEntry />


    </div>

  )





}

export default Expenses