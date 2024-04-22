import React, {  useState } from 'react'
import { BsTags } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { expenseEntryAtom, tagEntryAtom } from '../Store/Modal';
import { Toaster, toast } from 'react-hot-toast';
import { GoPlus } from "react-icons/go";
import { tagsAtom } from '../Store/Tags';
import { FaLock } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import {url} from '../util/clientUrl'
import axios from 'axios'
function ExpenseEntry() {
  
  const [tagValue, setTagValue] = useRecoilState(tagsAtom);
  const [tag, setTag] = useState([<BsTags />, "Select your tag"]);
  const [expenseValue, setExpenseValue] = useState('');
  const [openExpenseModal, setOpenExpenseModal] = useRecoilState(expenseEntryAtom);
  const [openTagModal, setOpenTagModal] = useRecoilState(tagEntryAtom);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [newTagModal, setNewTagModal] =useState(false);
  const [newTagIcon, setNewTagIcon] =useState("");
  const [newTagName, setNewTagName] =useState("");
  const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjo1LCJpYXQiOjE3MTMzNDczOTJ9.y5tUAjdF3IjeXZc9olXhnr3MOLfx8X42aaK6QSh1I_s";

  function handleNext() {
    if (expenseValue == 0 || !expenseValue)
      return toast.error("Amount should be greater than 0");
    if (tag[0] == <BsTags /> || tag[1] == "Select your tag" || !tag)
      return toast("Please add a tag", { icon: "🏷️" });

    setConfirmationModal(true);

  }

  function handleNewTagCreation(){
    if(newTagIcon=="")
    return toast.error("Enter a tag icon");
    if(newTagName=="")
    return toast.error("Enter a tag name");
    setTagValue([...tagValue, [newTagIcon,newTagName]]);
    setNewTagModal(false);
  }

   function handleConfirmation(){
    // DO api call

    const response =  axios.post(`${url}/api/v1/expense/enterexpense`,{
      amount: parseInt(expenseValue),
      tagIcon: tag[0],
      tagName: tag[1]
    },
  {
    headers:{
      'Content-Type': 'application/json',
      'authorization': token
    }
  }).then(()=>{setExpenseValue('');setTag([<BsTags />, "Select your tag"]);setConfirmationModal(false);setOpenExpenseModal(false); })
  // console.log(response.data);
 return toast.promise(
    response,
     {
       loading: 'Saving Expense...',
       success: <b>Expense saved!</b>,
       error: <b>Error saving expense</b>,
     }
   );
  }


  return (
    <>
      <Toaster position='top-center' />
      <AnimatePresence>

      {openExpenseModal && <motion.div className='h-screen w-full backdrop-blur-xl absolute top-0 bg-opacity-90 flex justify-center items-center z-20' initial={{y:"100%", scale:0 }} animate={{y:0, scale:"100%"}} exit={{y:"100%", scale:0 }}>

        <div className="card w-[90%] h-auto  rounded-2xl flex items-center flex-col py-2">

          <h1 className='text-slate-500'>Today at {new Date().toDateString()}</h1>
          <input type="number" className='w-[60%] border-b border-black text-center text-5xl focus outline-none font-semibold bg-transparent' placeholder='₹0' min={0} onChange={(e) => setExpenseValue(e.target.value)} value={expenseValue || ''} />

          <div><i className="fa-solid fa-arrow-down text-3xl text-slate-500 "></i></div>

          <div className='flex w-full justify-center gap-5 mt-2 hover:scale-x-105 text-xl'>
            <div className='flex items-center gap-5 ' onClick={() => setOpenTagModal(!openTagModal)}> <span>{tag[0]}</span> <h1>{tag[1]}</h1></div>
            <div><i class="fa-solid fa-arrow-rotate-left text-slate-600" onClick={() => { setTag([<BsTags />, "Select your tag"]); setOpenTagModal(true) }}></i></div>
          </div>

          <div className='flex gap-4 mt-4'>
            <button className='w-28 bg-red-400 h-14 rounded-lg text-xl hover:scale-x-105 text-white font-semibold' onClick={() => {
              setExpenseValue("");
              setTag([<BsTags />, "Select your tag"]);
              setOpenExpenseModal(false);
            }}>Cancel</button>
            <button className='w-28 bg-green-600 text-white h-14 rounded-lg text-xl hover:scale-x-105 font-semibold' onClick={handleNext}>Next</button>

          </div>


        </div>

      </motion.div>}
      </AnimatePresence>


      {/* tag entry popup */}
      <AnimatePresence>

      {openTagModal && <motion.div className='h-screen w-full backdrop-blur-sm z-30 absolute top-0 left-0' onClick={() => setOpenTagModal(false)}
        initial={{ y: "100%", scale: 0 }} animate={{y: 0, scale: "100%"}} exit={{ y: "100%", scale: 0 }}>

        <div className='popup-card border-t border-slate-200 rounded-3xl h-72 bg-white bottom-0 absolute w-full overflow-scroll overflow-x-hidden' onClick={(e) => e.stopPropagation()}>
          <div className='w-full text-slate-500 text-center '><h1>EXPENSES</h1></div>

          <div className='grid grid-cols-4 px-2 gap-6 p-2 '>
            <div className='child h-14 w-14 border rounded-full hover:border-slate-600 group ' onClick={()=>setNewTagModal(true)}>
              <div className='h-full w-full text-3xl text-slate-500 flex justify-center items-center group-hover:text-5xl transition-all duration-100 group-hover:text-slate-600'><GoPlus /></div>
            </div>

            {tagValue && tagValue.map((tag, index) =>
              <div className='child h-auto group' key={index}>
                <div className='text-3xl text-center' onClick={() => {
                  setTag(tag);
                  setOpenTagModal(false);
                }}>{tag[0]}</div>
                <div className='text-center text-sm group-hover:scale-110 transition-all duration-100'>{tag[1]}</div>
                <div />
              </div>)}

          </div>

        </div>

      </motion.div >}
      </AnimatePresence>


      {/* generate new tag here */}

      <AnimatePresence>

      {newTagModal && <motion.div className='h-screen w-full absolute top-0 left-0  z-30' initial={{ y:"100%", scale: 0 }} animate={{y: 0, scale: "100%"}} exit={{ y: "100%", scale: 0 }} onClick={()=>setNewTagModal(false)}>


        <div className='absolute bottom-0 h-80 bg-white w-full' onClick={(e)=>e.stopPropagation()}>
          <div className='w-full  h-10 flex items-center p-2 '> <h1 className='text-3xl' onClick={()=>{setNewTagModal(false); setNewTagIcon(""); setNewTagName("");}}><FaArrowLeftLong /></h1></div>
          <div className='w-full text-center p-2'><h1 className='text-2xl text-slate-800'>New Tag</h1></div>

          <div className='flex w-full  flex-col items-center gap-6 mt-2'>
                <div><input type="text" className='focus:outline-none border-b w-40 text-center text-xl'placeholder='🎁(Icon)' value={"" || newTagIcon} onChange={(e)=>setNewTagIcon(e.target.value)}/></div>
                <div><input type="text" className='focus:outline-none border-b w-40 text-center text-xl' placeholder='(Tag name)' value={"" || newTagName} onChange={(e)=>setNewTagName(e.target.value)}/></div>
                <div className='w-40'><button className='bg-blue-600 text-white text-lg font-semibold w-full h-12 rounded-lg hover:scale-110' onClick={handleNewTagCreation}>Confirm</button></div>
                {console.log(newTagIcon, newTagName)}
          </div>


        </div>
      

      </motion.div>
      
}
      </AnimatePresence>



      {/* confirmation DIv here */}
      <AnimatePresence>

      {confirmationModal && <motion.div className='h-screen w-full backdrop-blur-sm z-30 absolute top-0 left-0' onClick={() => setConfirmationModal(false)}
        initial={{ y: "100%", scale: 0 }} animate={{y: 0, scale: "100%"}} exit={{ y: "100%", scale: 0 }}>

        <div className='popup-card border-t border-slate-200 rounded-3xl h-72 bg-white bottom-0 absolute w-full  p-2' onClick={(e) => e.stopPropagation()}>
          <div className='w-full px-3'><h1 className='text-2xl font-bold'>Confirm</h1></div>

          <div className='w-full flex mt-2 pl-2'>
            <div className='h-7 min-w-7 rounded-full bg-slate-300 flex justify-center items-center text-xs '><FaLock /> </div>
            <div className='ml-2'><h1 className='text-xs text-slate-700 font-medium'>Help us ensure accuracy by reviewing your expense before confirming.</h1></div>
          </div>

          <div className='w-full flex justify-center  items-center gap-3 mt-4'>
            <div><h1 className='text-4xl font-semibold'>₹{expenseValue}</h1></div>
            <div className='text-2xl'><FaArrowRightLong /></div>
            <div className='flex flex-row items-center '>
              <div className='text-3xl'>{tag[0]}</div>
              <div className='text-xl'>{tag[1]}</div>
            </div>
          </div>
          
          <div className='w-full flex justify-between mt-2 px-3'>
            <div><button className='w-36 h-14 rounded-lg bg-slate-900 text-white text-xl hover:scale-x-105 font-semibold' onClick={()=>setConfirmationModal(false)}>Cancel</button></div>
            <div><button className='w-36 h-14 rounded-lg bg-green-500 text-white text-xl hover:scale-x-105 font-semibold' onClick={handleConfirmation}>Confirm</button></div>

          </div>


        </div>




      </motion.div>}
      </AnimatePresence>


    </>
  )
}






export default ExpenseEntry