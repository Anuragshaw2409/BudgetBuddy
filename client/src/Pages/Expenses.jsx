import React, { useState } from 'react'
import TopBar from '../Components/TopBar'
import ExpensesBox from "../Components/ExpensesBox"
import SpentDayWise from '../Components/SpentDayWise'
import Items from '../Components/Items'
import ExpenseEntry from '../Components/ExpenseEntry'


function Expenses() {
  

  return (
    <div className='relative'>
    
    <TopBar label={"Expenses"}/>
    <div className='expense-box w-full h-56'>
      <ExpensesBox expense={"750"} trail={"00"}/>
    </div>
    <div className='All-expenses w-full'>
      <SpentDayWise day="Today" totalspent={"750.00"}/>
      <Items title="Vacation" subtitle="02:01 PM" icon="🏖️" amount="80.00"/>
      <Items title="Medicine" subtitle="04:01 PM" icon="💊" amount="100.00"/>
      <Items title="Vacation" subtitle="02:01 PM" icon="🏖️" amount="80.00"/>
      <Items title="Vacation" subtitle="02:01 PM" icon="🏖️" amount="80.00"/>
      <Items title="Vacation" subtitle="02:01 PM" icon="🏖️" amount="80.00"/>
    </div>
    <ExpenseEntry />

    
    </div>
  )
}

export default Expenses