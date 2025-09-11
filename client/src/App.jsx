import { useState } from 'react'
import './index.css'
import { Route, Routes } from 'react-router'
import LandingPage from './page/LandingPage'
import SignIn from './page/SignIn'
import Dashboard from './page/Dashboard'
import {ToastContainer} from 'react-toastify'
import Auth from './page/Auth'
import CallPage from './page/CallPage'

export const backEndUrl=import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <div className="h-full w-full">
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/oauth/success' element={<Auth/>}></Route>
        <Route path='/medical-agent/:id' element={<CallPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
