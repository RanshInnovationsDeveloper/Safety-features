import { FaChevronDown } from "react-icons/fa";
import {
  IoLocateOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { PiBellLight } from "react-icons/pi";
import { useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { Toggle } from "react-toggle-component";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const [copied, setCopied] = useState(false);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); //TODO:Temp Arrangement Later tak eit from contex

  const navigate = useNavigate();

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };
  //Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin-login");
  };
  return (
    <header className="fixed top-0 flex justify-between items-center h-[4rem] z-10 mt-2 w-full ">
      <div className="flex justify-start items-center w-[300px] pl-6 gap-2  py-2 ">
        <img src="/emblem.png" alt="emblem" className="w-[2.5rem] h-[2.5rem]" />
        <img src="/police.png" alt="police" className="w-[2.5rem] h-[2.5rem]" />
        <p className="text-[14px] text-[#1E1E1E] font-semibold">
          Rajasthan Police
        </p>
      </div>
      <div className="flex justify-between  w-full items-center">
        <div className="flex justify-center items-center px-2 gap-4">
          <div className="rounded-full shadow-md w-10 h-10 flex justify-center  items-center">
            <FaAngleLeft className="text-[#4E7690]" />
          </div>
          <p className="text-[#71839B] text-[16px] font-medium">Categories</p>
        </div>
        <div className="rounded-[50px] bg-[#7E7E7E14] w-[550px] flex justify-center items-center h-14">
          <div className="w-[80%] flex justify-center items-center">
            <IoSearchOutline className=" w-6 h-6 text-[#BBCACC] " />
            <input
              type="text"
              placeholder="Search ..."
              className="bg-transparent w-[80%] px-2 appearance-none focus:outline-none placeholder:text-[#BBCACC] font-normal"
            />
          </div>

          <button className="w-[20%] bg-[#4E7690] rounded-[50px] text-white py-2 mr-2">
            Search
          </button>
        </div>
        <div className="flex justify-center items-center gap-12 px-1 w-[300px] ">
          <div className="flex justify-center items-center gap-3 ">
            <PiBellLight className=" w-6 h-6 text-[#4E7690]" />
            <IoSettingsOutline className=" w-6 h-6 text-[#4E7690]" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <div className="rounded-[50px]  flex justify-center items-center shadow-md w-[3rem] h-[3rem] ">
              <img src="/profile.svg" alt="im" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-[14px] font-medium text-[#71839B]">
                Chulbul pandey
              </h1>
              <div className="flex justify-center items-center gap-2">
                <p
                  className="text-[12px] flex justify-center items-center gap-1 font-bold cursor-pointer text-[#4E7690]"
                  onClick={() => {
                    copyToClipboard("123456");
                  }}
                >
                  {copied ? "Copied!" : "123456"}
                  <img src="/ion_copy.svg" alt="im" />
                </p>
                <div className="relative">
                  <FaChevronDown
                    className="text-[#71839B] w-4 h-4 cursor-pointer"
                    onClick={() => setProfilePopUp((prev) => !prev)}
                  />
                  {profilePopUp && (
                    <div className="absolute right-0 mt-2 w-full md:w-64 rounded-md shadow-lg bg-white z-50">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="flex items-start gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100">
                          <FaRegMoon />
                          <span>Dark Mode</span>
                          <Toggle
                            name="dark-mode-toggler"
                            onToggle={() => setIsDarkMode(!isDarkMode)}
                          />
                        </div>
                        <div className="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100">
                          <CgProfile />
                          <span>Show Profile</span>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100">
                          <IoSettingsOutline />
                          <span>Settings</span>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100">
                          <IoLogOutOutline />
                          <span onClick={logout}>Log Out</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
