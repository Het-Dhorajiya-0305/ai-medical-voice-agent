import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import Avatar from 'react-avatar';
import axios from 'axios';
import { backEndUrl } from '../App';

function Navbar({ navItems, islogin }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [plan, setPlan] = useState({ color: "emerald", badge: "Free" }); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const onclickSignin = () => navigate('/signin');

  const handleLogout = async () => {
    try {
      const response = await axios.get(backEndUrl + '/api/user/logout', {
        withCredentials: true
      });

      if (response.data.success) {
        navigate('/');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!islogin) return;

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(backEndUrl + '/api/user/info', {
          withCredentials: true
        });

        if (response.data.success) {
          setUsername(response.data.user.username);
          setPlan({
            color: response.data.user.subscription.plan == 'Pro' ? 'blue' : response.data.user.subscription.plan == 'Premium' ? 'violet' : "emerald",
            badge: response.data.user.subscription.plan || "Free"
          })
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [islogin]);

  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="fixed top-0 mx-auto px-10 z-60 gap-4 w-full flex max-sm:px-2 bg-white py-2 shadow-md">
      <div className="relative w-full z-30 mx-auto flex items-center justify-between px-6">
        <Link className="flex items-center">
          <img src="https://res.cloudinary.com/dhxwyq122/image/upload/v1784824358/ChatGPT_Image_Jul_23_2026_10_00_51_PM_mvbaxd.png" alt="logo" className="max-w-35" />
        </Link>

        {/* laptop view */}
        <div className="flex items-center justify-center space-x-8 max-sm:hidden">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.path}
              className="text-foreground/80 hover:text-cyan-600 transition-colors duration-300 font-semibold"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {islogin ? (
            <div className="flex items-center gap-3 relative">

              {username && <Avatar name={username} size={45} className="rounded-full hover:cursor-pointer hover:ring-2 hover:ring-blue-500" onClick={handleToggle} />}

              {isDropdownOpen && (
                <div className="absolute top-15 right-0 mt-2 bg-gray-300 shadow-lg rounded-lg p-4 flex flex-col gap-1 items-baseline transition-opacity duration-300">

                <div className="hover:bg-gray-100 p-2 rounded-lg w-full flex items-center justify-between gap-2">
                  <p className="flex items-center justify-between w-full text-[15px] font-semibold ">
                    <span>
                      {username}
                    </span>
                    <span
                      className={`rounded-full border w-3 h-3 
                        ${plan.color === "emerald"
                          ? "border-emerald-500 bg-green-600"
                          : plan.color === "blue"
                            ? "border-blue-500 bg-blue-600"
                            : "border-violet-500 bg-violet-600"
                        }`}
                    >
                    </span></p>
                </div>
                <div className="hover:bg-gray-100 p-2 rounded-lg w-full flex items-center justify-between gap-2">
                  <button
                    className="text-[15px] font-semibold rounded-xl hover:cursor-pointer"
                  >
                    profile
                  </button>
                </div>

                <div className="p-2 rounded-lg w-full flex items-center justify-between gap-2">
                  <button
                    className="bg-black text-white p-2 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>

              </div>)}

            </div>
          ) : (
            <button
              className="px-6 py-2 rounded-full text-white bg-blue-700 font-bold hover:cursor-pointer hover:bg-blue-600 transition-colors duration-300 w-max"
              onClick={onclickSignin}
            >
              Sign in
            </button>
          )}

          <button
            className="p-2 rounded-full border hover:cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300 hidden max-sm:block"
            onClick={toggleMenu}
          >
            <TiThMenu size={20} />
          </button>
        </div>

        {/* mobile menu */}
        <div
          className={`absolute bg-gray-300 flex flex-col gap-2 p-5 rounded-2xl ${isMenuOpen ? 'top-20 right-10' : 'hidden'
            } transition-all duration-200 sm:hidden`}
        >
          {navItems.map((item, key) => (
            <Link
              key={key}
              to={item.path}
              className="bg-black text-white p-2 px-4 text-[15px] font-semibold rounded-xl hover:cursor-pointer hover:bg-gray-800 transition-all duration-300"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
