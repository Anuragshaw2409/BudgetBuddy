import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function TopBar({label}) {
    const navigate = useNavigate();
    const [light, setLight] =useState(false);
    return (
        <>
            <div className='h-auto  flex justify-between p-3'>

                <i class="fa-regular fa-lightbulb text-2xl rotate-180 cursor-not-allowed text-yellow-500" onClick={()=>setLight((c)=>!c)}></i>
                <div>
                    <h1 className='font-semibold'>{label.toUpperCase()}</h1>
                </div>
                <i class="fa-solid fa-right-from-bracket text-2xl cursor-pointer" onClick={()=>navigate('/logout')}></i>



            </div>
        </>
    )
}

export default TopBar