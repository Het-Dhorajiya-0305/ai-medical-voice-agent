import React, { useState } from 'react'
import Description from './Description'

function Workspace() {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    console.log(visible);
    setVisible(!visible);
  }
  return (
    <div className='p-5 mt-20 px-30 max-md:px-10 max-lg:px-20'>
      <div className="flex justify-between items-center py-8 ">
        <h1 className='text-black text-2xl font-bold'>My Dashboard</h1>
        <button className='bg-black text-white p-3 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300 max-sm:hidden' onClick={handleVisibility}>+ Consult With Doctor</button>
      </div>
      <div className="border border-dashed border-gray-400 rounded-3xl flex flex-col justify-center items-center gap-2 p-5">
        <img src="https://res.cloudinary.com/dhxwyq122/image/upload/v1757438101/medical-assistance_egfec0.png" alt="medical-assitance" className='w-45' />
        <h1 className='text-2xl font-bold'>No Recent Consultations</h1>
        <p className='font-semibold'>It looks like you haven't consulted with any doctors yet</p>
        <button className='bg-black text-white p-3 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300' onClick={handleVisibility}>+ Start Consultation</button>
        {visible ?
          <Description handleVisibility={handleVisibility} visible={visible}/> : ""
        }
      </div>
    </div>
  )
}

export default Workspace