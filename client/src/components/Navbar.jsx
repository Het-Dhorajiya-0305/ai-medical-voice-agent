import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { TiThMenu } from "react-icons/ti";
import Avatar from 'react-avatar'
import axios from 'axios';
import { backEndUrl } from '../App';

function Navbar({ navItems, islogin }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onclickSignin = () => {
        navigate('/signin')
    }

    const handleLogout=async () => {
        try {
            const response=await axios.get(backEndUrl+'/api/user/logout',{
                withCredentials:true
            })

            if(response.data.success)
            {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='fixed top-0 mx-auto px-10 z-60 gap-4 w-full flex  max-sm:px-2 bg-white py-2 shadow-md'>
            <div className="relative w-full z-30 mx-auto flex items-center justify-between px-6">
                <a
                    className="flex items-center"
                    href="#hero"
                >
                    <img src="https://res.cloudinary.com/dhxwyq122/image/upload/v1757100386/Gemini_Generated_Image_m82yqvm82yqvm82y_swapw0.png" alt="logo" className='max-w-35' />
                </a>

                {/* laptopview */}
                <div className="flex items-center justify-center space-x-8 max-sm:hidden">
                    {navItems.map((item, key) => (
                        <a
                            key={key}
                            href={item.path}
                            className="text-foreground/80 hover:text-cyan-600 transition-colors duration-300 font-semibold "
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="flex items-center gap-3">

                    {islogin ? (
                        <div className="flex items-center gap-3">
                            <button className='bg-black text-white p-2 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300 max-sm:hidden' onClick={handleLogout}>Logout</button>
                            <Avatar name='het dhorajiya' size={45} className='rounded-full' />
                        </div>
                    ) :
                        (<button className='px-6 py-2 rounded-full text-white bg-blue-700 font-bold hover:cursor-pointer hover:bg-blue-600 transition-colors duration-300 w-max' onClick={onclickSignin}>
                            Sign in
                        </button>)}

                    <button className='p-2 rounded-full border hover:cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300 hidden max-sm:block' onClick={toggleMenu}>
                        <TiThMenu size={20} />
                    </button>
                </div>
                <div className={`absolute bg-gray-300 flex flex-col gap-2 p-5 rounded-2xl ${isMenuOpen ? 'top-20 right-10' : 'hidden'} transition-all duration-200 sm:hidden`}>
                    {navItems.map((item, key) => (
                        <a
                            key={key}
                            href={item.path}
                            className="bg-black text-white p-2 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300"
                            onClick={toggleMenu}
                        >
                            {item.name}
                        </a>
                    ))}
                    <button className='bg-black text-white p-2 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300' onClick={handleLogout}>Logout</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar
