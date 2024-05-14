// import police from "../../images/police.png";
// import emblem from "../../images/emblem.png";
// import bhajan_lal from "../../images/bhajan_lal.webp";
import { MdOutlineDashboard } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import { SiOpenaccess } from "react-icons/si";
// import { CiEdit } from "react-icons/ci";
// import { MdDeleteOutline } from "react-icons/md";
// import { MdOutlineAddLocationAlt } from "react-icons/md";

import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup, HiOutlineViewGridAdd } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting, AiOutlineUserAdd, AiOutlineEdit, AiFillEdit  } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { MdOutlineLocationOn, MdLocationOn } from "react-icons/md";
import { IoArchiveOutline,  IoArchive } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { MdMovieEdit } from "react-icons/md";
import AddLocationPopup from "./AddLocationPopup";

const AdminSideBar = ({ active }) => {

  const [open, setOpen] = useState(false);

  const toggleOpen  = () => {
    setOpen(!open);
  }

  return (
    <div className="w-full h-[85vh] bg-white  sticky top-0 left-0 p-2">
      <div className="px-6 py-2 mb-2">
        <div className="flex flex-col  justify-center items-center mb-5">
          <img src="/pic.png" 
          alt="imge"
          />
          <h1 className="text-center text-[14px] font-semibold">Shri Bhajan Lal Sharma 
Hon’ble Chief Minister of Rajasthan</h1>
        </div>
        <div className="  rounded-[50px] text-white bg-[#4E7690] py-3 items-center ">
          <button className="flex justify-center items-center  w-full gap-2" onClick={toggleOpen}>
            <img src="/Vector3.svg"
            alt="im"

            />

            <p className="text-[14px]">Add New Location</p>
          </button>
          <div className=" ">

          <AddLocationPopup open={open}/>
          </div>
          
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-[14px] text-[#4E7690] font-medium py-2 px-6">Menu</h1>
      <div className="w-full flex items-center p-4">
        <Link to="/admin-dashboard" className="w-full  px-2 flex items-center">
          < MdDashboard
            size={20}
            color={`#4E7690`}
            className={`${active === 1 ? 'visible': 'hidden' }`}
          />
          < MdOutlineDashboard
            size={20}
            color={`#71829B`}
            className={`${active === 1 ? 'hidden' : 'visible' }`}
          />
          <h5
            className={`hidden md:block pl-2 text-[16px]   ${active === 1 ? "font-semibold text-[#4E7690]" : " font-medium text-[#71829B]"
              }`}
            
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-location" className="w-full   px-2 flex items-center">
        <MdLocationOn
            size={20}
            color={`#4E7690`}
            className={`${active === 2 ? 'visible': 'hidden' }`}
          />
          <MdOutlineLocationOn
            size={20}
            color={`#71829B`}
            className={`${active !== 2 ? 'visible': 'hidden' }`}
          />
          <h5
           className={`hidden md:block pl-2 text-[16px]   ${active === 2 ? "font-semibold text-[#4E7690]" : " font-medium text-[#71829B]"
          }`}
          >
            Location
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-access" className="w-full   px-2 flex items-center">
          <img
          src = "/Vector.svg"
          alt="access"
            size={20}
            className={`${active !== 3 ? 'visible': 'hidden' }`}
          />
            <img
          src = "/Vector2.svg"
          alt="access"
            size={20}
            className={`${active === 3 ? 'visible': 'hidden' }`}
          />
          <h5
      className={`hidden md:block pl-2 text-[16px]   ${active === 3 ? "font-semibold text-[#4E7690]" : " font-medium text-[#71829B]"
    }`}
          >
            Access
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-edit-history" className="w-full  flex items-center  px-2">
          <AiOutlineEdit
            size={20}
            color={`#71829B`}
            className={`${active !== 4 ? 'visible': 'hidden' }`}
          />
          <AiFillEdit
            size={20}
            color={`#4E7690`}
            className={`${active === 4 ? 'visible': 'hidden' }`}
          />
          <h5
        className={`hidden md:block pl-2 text-[16px]   ${active === 4 ? "font-semibold text-[#4E7690]" : " font-medium text-[#71829B]"
      }`}
          >
            Edit History
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-archive"
          className="w-full flex items-center   px-2"
        >
          <IoArchive
            size={20}
            color={`#4E7690`}
            className={`${active === 5 ? 'visible': 'hidden' }`}
          />
           <IoArchiveOutline
            size={20}
            color={`#71829B`}
            className={`${active !== 5 ? 'visible': 'hidden' }`}
          />
          <h5
       className={`hidden md:block pl-2 text-[16px]   ${active === 5 ? "font-semibold text-[#4E7690]" : " font-medium text-[#71829B]"
      }`}
          >
            Archive
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center px-4  ">
        <Link
          to="/admin-delete-location"
          className={`w-fit py-3 px-2 rounded-xl flex items-center ${active === 6 ? "bg-[#F44336]": "bg-[#FDEBEA] "} `} 
        >
          <AiOutlineDelete
            size={20}
            color={`${active === 6 ? "#FDD9D7" : "#F44336"}`}
          />
          <h5
         className={`hidden md:block pl-2 text-[16px]   ${active === 6 ? "font-semibold text-[#FDD9D7]" : "font-medium text-[#F44336]"
        }`}
          >
            Deleted Locations
          </h5>
        </Link>
      </div>
      </div>
      {/* single item */}
      

    </div>
  );
};

export default AdminSideBar;