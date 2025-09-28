import React from 'react'
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import axios from 'axios'
import { backEndUrl } from '../App';
import { useNavigate } from 'react-router';


function SignIn() {

  const navigate = useNavigate();

  const [passwordLogin, setPasswordLogin] = useState(false);
  const [passwordSignUp, setPasswordSignUp] = useState(false);

  const [signUpUserName, setSignUpUserName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [signUp, setSignUp] = useState(false);

  const showPasswordLogin = () => {
    setPasswordLogin(Pre => !Pre)
  }
  const showPasswordSingUp = () => {
    setPasswordSignUp(Pre => !Pre)
  }

  const changeSignUp = (e) => {
    e.preventDefault();
    setSignUp(!signUp);
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: loginUsername,
        password: loginPassword
      }

      console.log(backEndUrl)

      const response = await axios.post(backEndUrl + '/api/user/login', payload, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      })

      if (response.data.success) {
        setLoginPassword('');
        setLoginUsername('');
        navigate('/dashboard',{state:{user:response.data.user}});
        localStorage.setItem('refreshToken', response.data.token);
        toast.success(response.data.message, { autoClose: 1000 });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      console.error(error);
    }
  }

  const signUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: signUpUserName,
        email: signUpEmail,
        password: signUpPassword
      }

      const response = await axios.post(backEndUrl + '/api/user/register', payload, {
        headers: {
          "Content-Type": 'application/json'
        }
      })

      if (response.data.success) {
        setSignUpEmail('');
        setSignUpPassword('');
        setSignUpUserName('');
        setSignUp(!signUp);
      }
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      console.error(error)
    }
  }

  const googleLogin = () => {
    window.location.href = `${backEndUrl}/api/user/auth/google`;
  };


  return (
    <div className='w-full h-screen p-10 flex items-center justify-center'>
      <div className='min-w-md rounded-2xl shadow-2xl p-3 py-5 flex flex-col items-center'>
        <img src="https://res.cloudinary.com/dhxwyq122/image/upload/v1757100386/Gemini_Generated_Image_m82yqvm82yqvm82y_swapw0.png" alt="logo" className='max-w-35' />

        {signUp ? (
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className='text-3xl font-bold mb-5'>Sign Up</h1>
            <form className="w-full flex flex-col gap-5 items-center p-2 px-5" onSubmit={(e) => signUpSubmit(e)}>
              <div className="border border-gray-400 h-12 flex items-center p-3 gap-3 focus-within:border-blue-500 focus-within:border-2 w-full rounded-xl">
                <FaUser />
                <input type="text" placeholder='Enter Username' value={signUpUserName} onChange={(e) => setSignUpUserName(e.target.value)} className='w-[85%] h-full focus:outline-0' />
              </div>
              <div className="border border-gray-400 h-12 flex items-center p-3 gap-3 focus-within:border-blue-500 focus-within:border-2 w-full rounded-xl">
                <IoMdMail size={18} />
                <input type="email" placeholder='Enter Email' value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className='w-[85%] h-full focus:outline-0' />
              </div>
              <div className="border border-gray-400 h-12 flex items-center p-3 gap-3 focus-within:border-blue-500 focus-within:border-2 w-full rounded-xl">
                <FaLock />
                <input required onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} type={passwordSignUp ? "text" : "password"} className='w-[85%] h-full focus:outline-0 ' placeholder="Enter your Password" />
                <span onClick={showPasswordSingUp} className='hover:cursor-pointer'>
                  {passwordSignUp ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
                </span>
              </div>
              <button type='submit' className='w-3/4 bg-blue-600 p-2 px-5 text-white font-bold rounded-2xl hover:cursor-pointer hover:bg-blue-500'>
                Sign Up
              </button>

            </form>
            <button onClick={googleLogin} className='w-71 flex items-center justify-center gap-2 font-bold ring-1 p-2 px-5 rounded-2xl hover:cursor-pointer hover:bg-blue-900 hover:text-white transition-all duration-200'>
              <FcGoogle size={25} />
              Continue with Google
            </button>
            <p className='font-semibold mt-3'>Already have an account <span className='text-blue-800 hover:cursor-pointer' onClick={(e) => changeSignUp(e)}>Login</span></p>
          </div>
        ) : (
          <div className='w-full flex flex-col items-center gap-2'>
            <h1 className='text-3xl font-bold mb-5'>Login</h1>
            <form className="w-full flex flex-col gap-5 items-center p-2 px-5" onSubmit={(e) => loginSubmit(e)}>
              <div className="border border-gray-400 h-12 flex items-center p-3 gap-3 focus-within:border-blue-500 focus-within:border-2 w-full rounded-xl">
                <FaUser />
                <input type="text" placeholder='Enter Username' value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className='w-[85%] h-full focus:outline-0' />
              </div>

              <div className="border border-gray-400 h-12 flex items-center p-3 gap-3 focus-within:border-blue-500 focus-within:border-2 w-full rounded-xl">
                <FaLock />
                <input required onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} type={passwordLogin ? "text" : "password"} className='w-[85%] h-full focus:outline-0 ' placeholder="Enter your Password" />
                <span onClick={showPasswordLogin} className='hover:cursor-pointer'>
                  {passwordLogin ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
                </span>
              </div>
              <button type='submit' className='w-3/4 bg-blue-600 p-2 px-5 text-white font-bold rounded-2xl hover:cursor-pointer hover:bg-blue-500'>
                Login
              </button>
            </form>
            <button onClick={googleLogin} className='w-71 flex items-center justify-center gap-2 font-bold ring-1 p-2 px-5 rounded-2xl hover:cursor-pointer hover:bg-blue-900 hover:text-white transition-all duration-200'>
              <FcGoogle size={25} />
              Continue with Google
            </button>
            <p className='font-semibold mt-3'>Don't have an account? <button className='text-blue-800 hover:cursor-pointer' onClick={(e) => changeSignUp(e)}>Sign Up</button></p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignIn