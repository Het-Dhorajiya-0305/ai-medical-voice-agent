import React, { useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { symptomSpecializationMap, doctors } from '../constant';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { backEndUrl } from '../App';

function Description({ handleVisibility, visible }) {

    const navigate = useNavigate();

    const [details, setDetails] = useState('');
    const [suggestedDoctor, setSuggestedDoctor] = useState(null);


    const handleNext = async () => {
        try {
            let suggestedSpecialization = "General Physician";
            Object.keys(symptomSpecializationMap).forEach(symptom => {
                if (details.toLowerCase().includes(symptom)) {
                    suggestedSpecialization = symptomSpecializationMap[symptom];
                }
            });
            const doctor = doctors.find(doc => doc.specialization === suggestedSpecialization);

            const option = {
                name: doctor?.name,
                specialization: doctor?.specialization
            }
            const response = await axios.post(backEndUrl + '/api/doctor/get-doctor', option, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Doctor fetched:", response.data);
            if (response.data.success) {
                setSuggestedDoctor(response.data.doctor);
            }
        }
        catch (error) {
            console.log("Error in fetching doctor:", error);
        }
    };
    const startconsultation = async () => {
        try {
            const response = await axios.post(backEndUrl + '/api/session/create-session', { doctorId: suggestedDoctor._id, note: details }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.data.success) {
                console.log("Session created:", response.data);
                navigate(`/medical-agent/${response.data._id}`, {
                    state: {
                        doctor: suggestedDoctor
                    }
                });
            }
        } catch (error) {
            console.log("Error in starting consultation:", error);
        }
    }

    return (
        <div className={`absolute w-full bg-black/30 h-full top-0 left-0 ${!visible ? 'hidden' : ''}`}>
            <div className="h-1/4 flex justify-center items-center max-md:items-start">
                <div className=" w-full h-3/4 mt-20 flex justify-center">
                    {!suggestedDoctor ? (
                        <div className="flex flex-col justify-start items-start h-[470px] w-1/3 p-6 gap-2 bg-white  rounded-2xl max-xl:w-1/2 max-md:w-3/4 max-sm:w-[80%]">
                            <h1 className='text-2xl font-semibold'>Add Basic Details</h1>
                            <p className='text-sm text-gray-500'>Add Symptoms or Any Other Details</p>
                            <textarea value={details} onChange={(e) => setDetails(e.target.value)} className='w-full h-3/4 border-2 border-gray-300 rounded-lg p-2 resize-none' placeholder='Add Details here...'></textarea>
                            <div className=" flex justify-end items-center w-full mt-1 gap-2">
                                <button className='bg-gray-200 text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 ml-2 hover:cursor-pointer ' onClick={handleVisibility}>Cancel</button>
                                <button className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 hover:cursor-pointer flex items-center gap-3 disabled:bg-gray-600' disabled={details == ''} onClick={handleNext}>Next <FaArrowRight /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-start items-start h-[400px] w-1/3 p-6 gap-2 bg-white  rounded-2xl max-xl:w-1/2 max-md:w-3/4 max-sm:w-[80%] max-sm:h-[470px]">
                            <h2 className="text-lg font-bold">Suggested Doctor:</h2>
                            <div className="w-full rounded-xl shadow bg-gray-50 flex flex-col items-center p-3">
                                <img src={suggestedDoctor.imageUrl} alt={suggestedDoctor.name} className='w-32 h-32 rounded-full object-cover mb-2' />
                                <h3 className="font-bold">{suggestedDoctor.name}</h3>
                                <p className="font-semibold">{suggestedDoctor.specialization}</p>
                                <p className="text-sm text-gray-500">{suggestedDoctor.description}</p>
                            </div>
                            <div className=" flex justify-end items-center w-full mt-1 gap-2 flex-wrap">
                                <button className='bg-gray-200 text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 ml-2 hover:cursor-pointer ' onClick={handleVisibility}>Cancel</button>
                                <button className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 hover:cursor-pointer flex items-center gap-3 disabled:bg-gray-600' disabled={details == ''} onClick={startconsultation}>Start Consultation <FaArrowRight /></button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Description