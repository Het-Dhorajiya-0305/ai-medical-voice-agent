import React from 'react'
import Navbar from '../components/Navbar';
import { navItemsForDashboard } from '../constant';
import Workspace from '../components/Workspace';
import Doctors from '../components/Doctors';

function Dashboard() {
  return (
    <div className='min-h-screen bg-gray-100 relative'>
      <Navbar navItems={navItemsForDashboard} islogin={true}/>
      <Workspace />
      <Doctors/>
    </div>
  )
}

export default Dashboard;