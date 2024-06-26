
import AdminArchive from "../../components/admin/AdminArchive";
import AdminEdit from "../../components/admin/AdminEdit";
import AdminLocation from "../../components/admin/AdminLocation";
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminEditHistoryPage=()=>{
 const navigate = useNavigate();

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
          <div className="w-[80px] md:w-[300px] sticky top-[5rem]">
            <AdminSidebar active={4} />
          </div>
          <div className="flex flex-col justify-center relative w-full p-4  mt-2">
            <div>
            <AdminEdit/>
            </div>
           
          </div>
        </div>
      </div>
      </div>
        

    )
}

export default AdminEditHistoryPage