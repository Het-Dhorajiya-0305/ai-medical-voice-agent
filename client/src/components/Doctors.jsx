import React, { useEffect, useState } from 'react'
import { doctors } from '../constant'
import axios from 'axios';
import { backEndUrl } from '../App';

function Doctors() {
    const [doctorsList, setDoctorsList] = useState(doctors);

    const fetchDoctors = async () => {
        try {
            const response=await axios.get(backEndUrl+'/api/doctor/doctors');
            if(response.data.success){
                setDoctorsList(response.data.doctors);
            }

        } catch (error) {
            console.log("Error fetching doctors:", error);
        }
    }
    useEffect(() => {
        fetchDoctors();
    },[])

    return (
        <div className='p-4 px-30 text-left max-md:px-10 max-lg:px-20'>
            <h1 className='text-black text-2xl font-bold'>AI Specialist Doctor Agent</h1>
            <div className="flex flex-wrap gap-5 mt-5 items-center justify-center">
                {doctorsList.map((doctor, index) => (
                    <div className="w-[300px] rounded-2xl shadow-lg bg-white pb-3" key={index}>
                        <img src={doctor.imageUrl} alt={doctor.name} className='w-[300px] h-[350px] rounded-t-2xl object-cover' />
                        <div className="p-2 h-32">
                            <h1 className='font-bold text-lg'>{doctor.name}</h1>
                            <h2 className='font-semibold'>{doctor.specialization}</h2>
                            <p className='text-sm text-gray-500'>{doctor.description}</p>
                        </div>
                        <div className="flex justify-center">
                            <button className='w-3/4 bg-black text-white p-2 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300'>Start Consultation</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Doctors