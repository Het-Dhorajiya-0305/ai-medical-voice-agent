import { useEffect, useState } from 'react'
import './index.css'
import { Route, Routes, useNavigate,useLocation } from 'react-router-dom'
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
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const response = await axios.get(backEndUrl + '/api/user/auth', {
        withCredentials: true
      });

      if (response.data.success) {

        if (location.pathname === '/' || location.pathname === '/signin') {
          navigate('/dashboard');
        }
      } else {

        if (location.pathname !== '/' && location.pathname !== '/signin') {
          navigate('/');
        }
      }
    } catch (error) {
      if (location.pathname !== '/' && location.pathname !== '/signin') {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);


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
