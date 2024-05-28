
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminDashboard from '../../components/admin/AdminDashboard';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddLocationPopup from "../../components/admin/AddLocationPopup";
const SuperAdminLocaionPage=()=>{
 const navigate = useNavigate();
 const location = useLocation();
 const [open, setOpen] = useState(false);
 
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

 const linkstart = location.pathname.substring(0, location.pathname.indexOf('-'));
console.log(linkstart)
    useEffect(  ()=>{

        if(!localStorage.getItem('token')){
            navigate(`${linkstart}-login`)
          } 

      },[localStorage.getItem('token')]);

    return (
      <div className='relative'>
        <AdminNavbar/>
        <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4.5rem]">
          <div className="w-[80px] md:w-[300px] sticky top-[5rem] ">
            <AdminSidebar active={2} fetchData={fetchData} open={open} setOpen={setOpen}  />
          </div>
          <div className="flex flex-col justify-center relative w-full p-4  mt-2">
            <div>
            <AdminDashboard isLoading={isLoading} setIsLoading={setIsLoading}  data={data} fetchData={fetchData} />
            {/* <AddLocationPopup/> */}
            </div>
            {open && <div>
              <AddLocationPopup open={open} setOpen={setOpen} fetchData={fetchData}/>
              </div>}
            
           
          </div>
        </div>
      </div>
      </div>
        

    )
}

export default SuperAdminLocaionPage