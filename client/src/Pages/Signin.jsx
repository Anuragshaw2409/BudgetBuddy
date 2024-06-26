import React, { useEffect, useState } from 'react'
import logo from '../assets/Images/logo.png'
import hero from '../assets/Images/hero-image.png'
import InputBox from '../Components/InputBox'
import PasswordInput from '../Components/PasswordInput'
import { Link,useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import {z} from'zod';
import axios from 'axios';
import { url } from '../util/clientUrl';



function Signin() {
  const navigate = useNavigate();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const signInSchema = z.object({
    email: z.string().email({message: "Enter valid email"}),
    password: z.string().min(6,{message: "Enter valid password"})
  });

  // Do the api call
  async function handleButton(){
    const parsedValues = signInSchema.safeParse({email, password});
    if(!parsedValues.success){
      setMessage(parsedValues.error.issues[0].message);
    }

    else{
      try {
        const response = await axios.put(`${url}/api/v1/user/signin`,parsedValues.data);
        const data = response.data;
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        navigate('/app/expenses');

        
      } catch (error) {
        setMessage(error.response.data.message);
      }

    }


  };



  return (
    <div className='bg-slate-50 h-screen relative'>
      <div className="topbar flex justify-between h-24 p-2">
        <div className="imageContainer h-full ">
          <img className="object-contain h-full" src={logo} alt="" /></div>
          <div className="signin h-full mr-6  mt-6 cursor-pointer">
            <i className="fa-solid fa-house text-4xl text-blue-700" onClick={() => navigate('/signup')}></i>
          </div>



      </div>

      <h1 className='pl-4 pb-4 font-bold text-3xl pt-4'>Sign in to your account</h1>

      <div className="card h-auto mx-2  bg-blue-100 rounded-xl overflow-clip pt-1 p-2">
        <div className="topbar h-40 flex justify-center">
          <img src={hero} alt="" className='object-contain h-full' />
        </div>
        <InputBox label="Email" onChange={(value) => {setEmail(value); setMessage(null)}} icon="fa-solid fa-envelope " />
        <PasswordInput label="Password" onChange={(value) => {setPassword(value); setMessage(null);}} icon="fa-solid fa-lock " />
        {message && <div className='w-full text-lg text-red-600 text-center'>{message}</div>}
        <div className="submitButton w-full p-4">

          <button className='bg-blue-400 w-full h-12 rounded-xl text-white hover:bg-blue-600' onClick={handleButton}>Sign Up</button>
        </div>

      </div>

      <div className='w-full text-center'>

        <p>Don't have an account? <Link to='/signup' className='text-blue-700'> Sign up</Link></p>

      </div>
      <Footer/>


    </div>
  )
}

export default Signin