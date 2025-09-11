import React from 'react'

function Hero() {
    return (
        <div id='hero' className='w-full mt-10 h-screen bg-gradient-to-b from-white to-cyan-400 flex justify-center gap-5 items-center z-1 p-7'>
            <div className="lg:max-w-[700px] max-lg:text-center h-full flex flex-col gap-10 items-center justify-center text-left p-4">
                <h1 className='text-5xl font-bold'>Revolutionize Healthcare with <span className='text-cyan-500'>AI-Powered</span> Medical <span className='text-cyan-500'>Voice</span> Agents</h1>
                <p className='font-semibold text-gray-500'>Faster, accurate, and natural voice interactions for patient care, appointment management, and medical assistance — anytime, anywhere.</p>
            </div>
            <div className="max-lg:hidden animate-float">
                <img src="https://res.cloudinary.com/dhxwyq122/image/upload/v1757103887/doctor_yatf6w.jpg" alt="doctor" className='max-w-110 rounded-3xl'/>
            </div>
        </div>
    )
}

export default Hero