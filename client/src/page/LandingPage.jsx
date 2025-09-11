import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Benifits from '../components/Benifits'
import MeetDoctor from '../components/MeetDoctor'
import Footer from '../components/Footer'
import { navItems } from '../constant'



function LandingPage() {
  return (
    <div className='max-w-full h-full'>
        <Navbar navItems={navItems} islogin={false}/>
        <Hero/>
        <Benifits/>
        <MeetDoctor/>
        <Footer/>
    </div>
  )
}

export default LandingPage