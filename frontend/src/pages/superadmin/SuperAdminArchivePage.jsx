
import AdminArchive from "../../components/admin/AdminArchive";
import AdminLocation from "../../components/admin/AdminLocation";
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
const SuperAdminArchivePage=()=>{
 const navigate = useNavigate();
 const [isLoading, setIsLoading] = useState(true);
 const [data, setData] = useState();
 
 const fetchData = async () => {
  setIsLoading(true);
   try {
     const items = await axios.get(
       "https://safety-features.onrender.com/api/place/fetchAllPlaces"
     );
     setData(items?.data);
     setIsLoading(false);
   } catch (error) {
     toast.error(error.message);
   }
 };

    useEffect(  ()=>{

        if(!localStorage.getItem('token')){
            navigate("/admin-login")
          } 

      },[localStorage.getItem('token')]);

    return (
      <div className='relative'>
        <AdminNavbar/>
        <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4.5rem]">
          <div className="w-[80px] md:w-[300px] sticky top-[5rem] z-50">
            <AdminSidebar active={5} fetchData={fetchData} />
          </div>
          <div className="flex flex-col justify-center relative w-full p-4  mt-2">
            <div>
            <AdminArchive/>
            </div>
           
          </div>
        </div>
      </div>
      </div>
        

    )
}

export default SuperAdminArchivePage