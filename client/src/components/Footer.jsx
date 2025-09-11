import React from 'react'
import { FaRegCopyright } from "react-icons/fa";


function Footer() {
    return (
        <div className='p-5 mt-10 flex flex-col gap-5 items-center'>
            <h1 className='text-5xl font-semibold '>Ready to Transform Healthcare with <span className='text-cyan-500'>AI ?</span></h1>
            <p className='font-semibold'>Get started today and see how our voice agent can boost efficiency and patient experience.</p>
            <button className='px-6 py-2 rounded-full text-white bg-blue-700 font-bold hover:cursor-pointer hover:bg-blue-600 transition-colors duration-300 w-max'>
                Book a Free Demo
            </button>

            <div className="flex items-center gap-3 pt-5">
                <FaRegCopyright /> 2025 All rights reserved.
            </div>
        </div>
    )
}

export default Footer