import React, { useState } from 'react';

function PasswordInput({ label, onChange, icon }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [visible, setVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <>
      <div className="relative mt-6 ">
        <input
          type={`${visible?'text':'password'}`}
          id="inputBox"
          className="w-full h-10 bg-transparent border-b pl-7 peer border-black focus:outline-none text-xl text-blue-800 focus:border-blue-500 transition-colors duration-200 ease-in-out"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <label htmlFor="inputBox" className='absolute left-1 top-1 text-xl text-blue-700'>
        <i class={icon}></i>
        </label>
        <label
          htmlFor="inputBox"
          className={`absolute left-7 top-1  peer-focus:text-base transition-all duration-200 ${
            isFocused || inputValue ? '-top-5 text-base text-blue-500' : 'text-xl'
          }`}
        >
          {label}
        </label>
        <div className='absolute top-0 right-2 text-xl'>
            <i className= {`fa-regular ${visible?'fa-eye-slash':'fa-eye'}`}onClick={()=>setVisible((c)=>!c)}></i>
            </div>
      </div>
    </>
  );
}

export default PasswordInput;
