
import AdminAccess from "../../components/admin/AdminAccess";
import AdminLocation from "../../components/admin/AdminLocation";
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const SuperAdminAccessPage=()=>{
 const navigate = useNavigate();

    useEffect(  ()=>{

        if(!localStorage.getItem('token')){
            navigate("/superadmin-login")
          } 

      },[localStorage.getItem('token')]);

    return (
      <div className='relative'>
        <AdminNavbar/>
        <div className="w-full flex">
        <div className="flex items-start justify-between w-full mt-[4.5rem]">
          <div className="w-[80px] md:w-[300px] sticky top-[5rem]">
            <AdminSidebar active={3} />
          </div>
          <div className="flex flex-col justify-center relative w-full p-4  mt-2">
            <div>
            <AdminAccess/>
            </div>
           
          </div>
        </div>
      </div>
      </div>
        

    )
}

export default SuperAdminAccessPage