import React, { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBagHeartFill, BsBagCheckFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../redux/reducers/userReducer";
import { useUserLogoutMutation } from "../redux/api/userAPI.js";
import { MdSpaceDashboard } from "react-icons/md";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import femaleUserImage from '../../public/pictures/girlprofile.png';
import maleUserImage from '../../public/pictures/boyprofile.png';

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [logoutUser] = useUserLogoutMutation();

  const logOut = () => {
    try {
      dispatch(userNotExist());
      logoutUser();
      toast.success("Sign Out Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full md:w-[25%] ">
      {/* Hamburger button for mobile view */}
      <button
        className="block md:hidden absolute top-0 z-50 right-2 p-2 text-gray-700 bg-gray-200 rounded-full"
        onClick={toggleMenu}
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
      )}

      {/* Sidebar component for both desktop and mobile view */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block fixed md:relative top-[6rem] md:top-auto right-0 z-50 md:z-auto w-[100%] h-screen md:w-auto mx-auto justify-center items-center bg-white shadow-lg md:shadow-none rounded-lg md:rounded-none`}
      >
        <div className="aside w-[90%] md:w-[320px] mx-auto justify-center items-center rounded-lg md:rounded-none md:border-none px-3 pl-7 shadow-r-xl md:shadow-none text-zinc-700 font-extralight">

          {/* Close button for mobile view */}
          <button
            className="block md:hidden absolute top-4 right-3 p-2 text-zinc-600  rounded-full"
            onClick={toggleMenu}
          >
            <MdCancel className="text-3xl" />
          </button>

          <div className="profile mb-4 w-full h-32 left-0 border-b border-gray-300 items-center flex p-1">
            <div className="icon   w-20 h-20 text-slate-900 flex items-center justify-center">
            <img
              src={user?.gender === "female" ? femaleUserImage : maleUserImage}
              alt="Profile"
              className="w-16 h-16 md:w-20 md:h-20 object-cover mix-blend-multiply rounded-full"
  />
            </div>
            <div className="ml-2">
              <p className="font-bold text-xl">{user?.name}</p>
              <p className="text-gray-400 text-sm font-semibold md:leading-none">{user?.email}</p>
              <p className="text-gray-400 text-sm font-semibold">+91-{user?.phone}</p>
            </div>
          </div>
          <div className="options relative h-[60vh] md:h-[70vh] rounded-lg md:rounded-none">
            <ul className="font-lighter">
              <li
                className={`flex items-center gap-1 px-4 py-1 my-1 rounded-lg text-[14px] font-medium hover:bg-blue-100 hover:text-blue-400 ${location.pathname.includes("/myprofile") ? "bg-blue-100 text-blue-500" : "bg-white text-gray-700"}`}
              >
                <div className="icon text-2xl rounded-full w-8 h-8 flex items-center justify-center">
                  <BiSolidUser className="text-[17px]" />
                </div>
                <Link to="/myprofile" onClick={toggleMenu}>Account Information</Link>
              </li>

              <li
                className={`flex items-center gap-1 px-4 py-1 my-1 rounded-lg text-[14px] font-medium hover:bg-blue-100 hover:text-blue-400 ${location.pathname.includes("/myorders") ? "bg-blue-100 text-blue-500" : "bg-white text-gray-700"}`}
              >
                <div className="icon text-2xl rounded-full w-8 h-8 flex items-center justify-center">
                  <BsBagCheckFill className="text-[17px]" />
                </div>
                <Link to="/myorders" onClick={toggleMenu}>My Orders</Link>
              </li>

              <li
                className={`flex items-center gap-1 px-4 py-1 my-1 rounded-lg text-[14px] font-medium hover:bg-blue-100 hover:text-blue-400 ${location.pathname.includes("/mypresciptionorders") ? "bg-blue-100 text-blue-500" : "bg-white text-gray-700"}`}
              >
                <div className="icon text-2xl rounded-full w-8 h-8 flex items-center justify-center">
                  <BsBagCheckFill className="text-[17px]" />
                </div>
                <Link to="/mypresrciptionorders" onClick={toggleMenu}>My Prescription Orders</Link>
              </li>

              {user?.role === "admin" ? (
                <li
                  className={`flex items-center gap-1 px-4 py-1 my-1 rounded-lg text-[14px] font-medium hover:bg-blue-100 hover:text-blue-400 ${location.pathname.includes("/admin/dashboard") ? "bg-blue-100 text-blue-500" : "bg-white text-gray-700"}`}
                >
                  <div className="icon text-2xl rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-100 hover:text-blue-400">
                    <MdSpaceDashboard className="text-[17px]" />
                  </div>
                  <Link to="/admin/dashboard" className="hover:bg-blue-100 hover:text-blue-400" onClick={toggleMenu}>Dashboard</Link>
                </li>
              ) : (
                <li
                  className={`flex items-center gap-1 px-4 py-1 my-1 rounded-lg text-[14px] font-medium hover:bg-blue-100 hover:text-blue-400 ${location.pathname.includes("/mywishlist") ? "bg-blue-100 text-blue-500" : "bg-white text-gray-700"}`}
                >
                  <div className="icon text-2xl rounded-full w-8 h-8 flex items-center justify-center">
                    <BsBagHeartFill className="text-[17px]" />
                  </div>
                  <Link to="/mywishlist" onClick={toggleMenu}>My Wishlist</Link>
                </li>
              )}
            </ul>
            <ul>
              <li className="flex w-full items-center gap-1 px-4 py-1 my-1 rounded-lg text-[14px] font-medium hover:bg-red-100 hover:text-red-400">
                <div className="icon text-2xl rounded-full w-8 h-8 flex items-center justify-center">
                  <IoLogOut className="text-[18px]" />
                </div>
                <button onClick={logOut}>LogOut</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
