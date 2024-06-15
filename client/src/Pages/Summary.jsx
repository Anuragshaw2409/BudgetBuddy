import React from 'react'
import TopBar from '../Components/TopBar'
import SummaryExpense from "../Components/SummaryExpense"
import ItemSummary from '../Components/ItemSummary'
import Items from '../Components/Items'
import { Link } from 'react-router-dom'
function Summary() {
  return (
    <>

    <TopBar label={"summary"}/>
    <div className="w-full flex">
      <SummaryExpense expense="700" trail="00"/>
      <div className='flex items-center text-base'>

      <h1 className='underline'><Link to={'/app/expenses'} className='hover:text-blue-600'> Expenses</Link></h1>
      <div className=''>

      <i className="fa-solid fa-caret-right text-yellow-400 text-2xl"></i>
      </div>
      </div>
    </div>

    {/* render graph here */}
    <div className="bg-blue-100 w-full h-72">
        Chart to be displayed
    </div>
    
    <div>
      <div className="w-full"><ItemSummary title="Highest Spent" subtitle="Mar 07 2024" amount="800" icon="fa-chart-line"/></div>
      <div className="w-full"><ItemSummary title="Most Entry" subtitle="2 on 🍕Food" amount="800" icon="fa-tag"/></div>
     
    </div>

    <div className='w-full'>

      <div className='rounded-lg border-t shadow-lg h-auto mt-1'>
          <Items title={"Medicine"} amount={"700"} subtitle={"2 entry"} icon={"💊"}/>
      </div>

    </div>
    
    </>
  )
}

export default Summary