import React from "react";
import "../css/Header.css"; // Import CSS file for styles
import emblem from "../images/emblem.png";
import police from "../images/police.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
function Header() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="header-container">
        <img src="new.png" alt="" className="header-icon" />
        <p className="header-text text-sm font-semibold ml-1 mr-2">
          Sub inspector Recruitment 2021 Appointment order of selected candidates
        </p>
        <img src="new.png" alt="" className="header-icon" />
      </div>
      <div className="relative flex w-full flex-row justify-between items-center h-[6rem] px-[3.25rem]">
        <div className="flex flex-row justify-center items-center">
          <img src={emblem} alt="" className="w-[4rem] h-[5.1rem] " />
          <img src={police} alt="" className="w-[4.5rem] h-[4.5rem] ml-2 mr-6" />
          <h1 className="text-2xl font-semibold">Rajasthan Police</h1>
        </div>
        <div className="flex flex-row justify-center items-center gap-6 ">
          <div className="flex flex-row justify-center items-center gap-2">
            <img src="lang.png" alt="" className=" w-9 h-9" />
            <img src="lang2.png" alt="" className=" w-9 h-9" />
            <img src="lang3.png" alt="" className=" w-[3.75rem] h-9" />
          </div>
          <div className="flex flex-col justify-center items-center ">
            <img src="pic.png" alt="" className=" w-10 h-8" />
            <p className="font-semibold text-[1.125rem] leading-4">
              Shri Bhajan Lal Sharma
            </p>
            <p className=" font-semibold text-lg">
              Hon’ble Cheif Minister of Rajasthan

            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center bg-[#4e7690] w-full h-[3.5rem] px-[3.25rem]">
        <div className="flex flex-row justify-center items-center text-white gap-3">
          <GiHamburgerMenu  className=" w-6 h-6"/>
          <IoMdHome className=" w-6 h-6"/>
        </div>
        <div className="flex flex-row justify-center items-center gap-3 text-white ">
          <h1 className="font-semibold">Emergency No.: 112</h1>
          <h1 className="font-semibold">Garima Helpline: 1090</h1>
          <h1 className="font-semibold ">Ambulance: 108</h1>
          <h1 className="font-semibold ">Child Helpline: 1098</h1>
          <h1 className="font-semibold ">Cyber Helpline: 1930</h1>
          <h1 className="font-semibold ">State Centralized Call Centre no.: 181</h1>
        </div>
      </div>
    </div>

  );
}
export default Header;
