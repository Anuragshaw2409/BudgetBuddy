import React, { useState } from 'react'
import logo from '../assets/Images/logo.png'
import hero_image from '../assets/Images/hero-image(1).png'
import InputBox from '../Components/InputBox'
import PasswordInput from '../Components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import {url} from '../util/clientUrl'
import axios from 'axios';
import {z} from 'zod';


function Signup() {


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] =useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  
  const navigate = useNavigate();

  const signUpSchema = z.object({
    firstName: z.string().min(1,{message: "Enter valid name"}),
    lastName: z.string().min().optional(),
    email: z.string().email({message: "Enter valid email"}),
    password: z.string().min(6,{message:"Password must be atleast 6 characters"})
  });


  async function handleSignUp(){
    const parsedValues = signUpSchema.safeParse({
      firstName,
      lastName, 
      email, 
      password});
    if(!parsedValues.success){
      setMessage(parsedValues.error.issues[0].message);
      return;

    }

    try {
      const response = await axios.post(`${url}/api/v1/user/signup`,{
        firstName,
        lastName,
        email,
        password
      });
      const data = response.data;
      console.log(data);
      setMessage(data.message);
      localStorage.setItem('token', data.token);
      
      navigate('/app/expenses');
      
    } catch (error) {

      setMessage(error.response.data.message);
      
    }
    


  }
  return (
    <>
      <div className="h-screen bg-slate-50">

        <div className="topbar flex justify-between h-24 p-2">
          <div className="imageContainer h-full ">
            <img className="object-contain h-full" src={logo} alt="" /></div>
          <div className="signin h-full mr-6  mt-6 cursor-pointer">
            <i className="fa-solid fa-right-to-bracket text-4xl text-blue-700" onClick={() => navigate('/signin')}></i>
          </div>


        </div>



        <div className="heading w-full text-3xl font-bold p-4 text-center ">
          <h1>Empower Your Finances with BudgetBuddy</h1>
        </div>
        <div className="para w-full text-xl font-semibold px-8 text-center ">
          <p>The Comprehensive Solution for Managing Expenses, Saving Smartly, and Achieving Financial Goals</p>
        </div>

        <div className="hero-image mt-4">
          <img src={hero_image} alt="" />
        </div>

        <div className="font-bold text-center text-lg px-10 mt-2">
          <h1 className=''>Ready to take charge of your finances?</h1>
          <br />
          <h1 className='-mt-6 text-xl '>Sign up now</h1>
        </div>
        <div className='w-full text-blue-600 text-center mt-1 '>
          <i className="fa-solid fa-chevron-down text-7xl cursor-pointer" onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          }}></i>
        </div>

      </div>

      {/* First Page */}



      <div className="page2 h-screen bg-slate-50 pt-10 relative">

        <h1 className='pl-4 pb-4 font-bold text-3xl'>Sign up new account</h1>

        <div className="card h-auto mx-2  bg-blue-100 rounded-xl overflow-clip pt-1">
          <div className="topbar h-40 flex justify-center">
            <img src={logo} alt="" className='object-contain h-full' />
          </div>
          <div className="inputs w-full px-3 rounded-md">

            <InputBox label="Name" onChange={(value) => {setFirstName(value); setMessage(null)}} icon="fa-solid fa-user " />
            <InputBox label="Last Name" onChange={(value) => {setLastName(value);setMessage(null)}} icon="fa-solid fa-user" />
            <InputBox label="Email" onChange={(value) => {setEmail(value);setMessage(null);}} icon="fa-solid fa-envelope " />
            <PasswordInput label="Password" onChange={(value) => {setPassword(value);setMessage(null);}} icon="fa-solid fa-lock " />

          {message && <div className='w-full text-lg text-red-500 text-center'>{message}</div>}
            <div className="submitButton w-full p-4">

              <button className='bg-blue-400 w-full h-12 rounded-xl text-white hover:bg-blue-600' onClick={handleSignUp}>Sign Up</button>
            </div>


          </div>


        </div>
        <div className='w-full text-center'>

          <p>Already have an account? <Link to='/signin' className='text-blue-700'> Sign in</Link></p>

        </div>

        <Footer/>










      </div>



    </>
  )
}

export default Signup