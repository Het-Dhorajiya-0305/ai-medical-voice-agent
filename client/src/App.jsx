import { useEffect, useState } from 'react'
import './index.css'
import { Route, Routes, useNavigate } from 'react-router'
import LandingPage from './page/LandingPage'
import SignIn from './page/SignIn'
import Dashboard from './page/Dashboard'
import { ToastContainer } from 'react-toastify'
import Auth from './page/Auth'
import CallPage from './page/CallPage'
import History from './page/History'
import axios from 'axios'

export const backEndUrl = import.meta.env.VITE_BACKEND_URL;

function App() {

  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await axios.get(backEndUrl + '/api/user/auth', {
        withCredentials: true
      })

      if (response.data.success) {
        navigate('/dashboard');
      }
      else {
        navigate('/');
      }
    } catch (error) {
      navigate('/');
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <div className="h-full w-full">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/oauth/success' element={<Auth />}></Route>
        <Route path='/medical-agent/:id' element={<CallPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
