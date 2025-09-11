import React from 'react'
import { TbClock24 } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiVoiceprintLine } from "react-icons/ri";

function Benifits() {
    return (
        <div id='benifits' className='max-w-full p-10'>
            <h1 className='my-10 text-5xl font-bold flex items-center justify-center gap-5'><span className='border-b w-20 '></span> Benifits <span className='border-b w-20 '></span></h1>
            <div className="w-full h-max  flex items-center justify-center gap-5 max-md:flex-col">
                <div className="w-2/4 h-full flex flex-col items-center justify-center gap-8 shadow-xl/20 p-6 rounded-2xl max-md:w-full">
                    <TbClock24 size={60} />
                    <h1 className='text-xl font-semibold'>24/7 Availability</h1>
                    <p className='text-gray-700 font-semibold'>Patients get help instantly, without waiting for staff.</p>
                </div>
                <div className="w-2/4 h-full flex flex-col items-center justify-center gap-8 shadow-xl/20 p-6 rounded-2xl max-md:w-full">
                    <RiVoiceprintLine size={60}/>
                    <h1 className='text-xl font-semibold'>Natural Conversations</h1>
                    <p className='text-gray-700 font-semibold'>Understands medical queries with human-like accuracy.</p>
                </div>
                <div className="w-2/4 h-full flex flex-col items-center justify-center gap-8 shadow-xl/20 p-6 rounded-2xl max-md:w-full">
                    <BsGraphUpArrow size={60} />
                    <h1 className='text-xl font-semibold'>Smart Insights</h1>
                    <p className='text-gray-700 font-semibold'>Provides summaries reports for healthcare providers.</p>
                </div>
            </div>
        </div>
    )
}

export default Benifits