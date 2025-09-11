import React from 'react'
import { useNavigate } from 'react-router';


function MeetDoctor() {
  const navigate=useNavigate();
  const token=false;
  const doctors = [
    {
      name: "Dr. John Smith",
      imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757155769/2_woneoa.jpg",
      specialization: "Cardiologist"
    },
    {
      name: "Dr. Sarah Brown",
      imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757155796/doctor1_pcbr21.jpg",
      specialization: "Dermatologist"
    },
    {
      name: "Dr. Michael Williams",
      imageUrl: "https://res.cloudinary.com/dhxwyq122/image/upload/v1757155821/3_hsx6hm.jpg",
      specialization: "Neurologist"
    },
  ];

  const makeAppointment=()=>{
    if(token)
    {
      navigate('/dashboard');
    }
    else
    {
      navigate('/signin')
    }
  }

  return (
    <div id='doctors' className='w-full bg-gradient-to-b from-cyan-400 to-white p-5 py-20 mt-15'>
      <div className="flex flex-col gap-10 items-center">
        <div className='flex items-center gap-5 mt-10'>
          <span className='border-b w-30 max-md:hidden'></span>
          <h1 className='text-5xl font-bold max-md:text-4xl'>
            Meet Our <span className='text-cyan-700'>Specialists</span>
          </h1>
          <span className='border-b w-30 max-md:hidden'></span>
        </div>
        <div className="flex items-center justify-center gap-4 p-2 flex-wrap">
          {
            doctors.map((doc, index) => (
              <div key={index} className=" rounded-2xl flex flex-col items-center gap-2 bg-white shadow-2xl hover:scale-102 transition-all duration-200" >
                <img src={doc.imageUrl} alt={doc.name} className='rounded-t-2xl w-sm' />
                <div className="px-3 pb-8 gap-3 flex flex-col">
                  <h1 className='text-2xl font-semibold mt-2'>{doc.name}</h1>
                  <h2 className='text-cyan-500 font-semibold'>{doc.specialization}</h2>
                  <h1 className='font-semibold flex items-center justify-center gap-2 hover:cursor-pointer' onClick={makeAppointment}><span className='border-b w-15 border-b-gray-300 '></span> MAKE APPOINTMENT <span className='border-b w-15 border-b-gray-300 '></span></h1>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default MeetDoctor