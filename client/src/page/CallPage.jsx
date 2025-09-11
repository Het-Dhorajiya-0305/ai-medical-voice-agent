import React from 'react'
import Navbar from '../components/Navbar'
import { navItemsForDashboard } from '../constant'
import { useParams } from 'react-router'

function CallPage() {
    const sessionId=useParams().id;
  return (
    <div>
      <Navbar navItems={navItemsForDashboard} islogin={true}/>
      <h1 className='mt-30'>{sessionId}</h1>
    </div>
  )
}

export default CallPage