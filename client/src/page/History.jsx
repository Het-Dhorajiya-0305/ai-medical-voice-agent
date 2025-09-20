import React from 'react'
import Navbar from '../components/Navbar';
import { navItemsForDashboard } from '../constant';
import Doctors from '../components/Doctors';
import HistoryComponent from '../components/HistoryComponent';


function History() {
    return (
        <div className='min-h-screen bg-gray-100 relative'>
            <div className='min-h-screen bg-gray-100 relative'>
                <Navbar navItems={navItemsForDashboard} islogin={true} />
                <HistoryComponent/>
                <Doctors />
            </div>
        </div>
    )
}

export default History