import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import image1 from "../../images/police.jpg";
export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ userid: "", password: "" })
  let navigate = useNavigate();

  useEffect(  ()=>{

    if(localStorage.getItem('token')){
        navigate("/admin")
      } 

  },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: credentials.userid, password: credentials.password })
    });
    const json = await response.json();       // in this case which is auth token 
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/admin");        //this is redirecting me to the home page after I login
      console.log("Logged In SUCCESSFULLY", "success")
    }
    else {
      console.log("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {                                       
    console.log(e.target.name);
    //this is fucntion is one of its kind
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    console.log(credentials);
  }

  return (
    <div className='flex flex-row justify-center items-center h-screen'>
      <div className="w-[60%] flex flex-row justify-center ">
        <div className=" flex flex-col w-[32rem] justify-evenly h-[40rem] items-center border-2 border-[#DADADA] rounded-3xl ">
         <div className="flex flex-col justify-center items-center w-[32rem] h-[90%]">
         <h1 className='text-2xl font-semibold mb-2'>Login</h1>
          <p className='text-[#4E7690] mb-14 font-normal text-md'>Enter the details as per given by higher authorities</p>
          <form onSubmit={handleSubmit} className='w-full px-10 '>
            <div className="flex flex-col justify-center w-full  gap-2 mb-4">
              <label className='text-[#4E7690]'>ID (reduired)</label>
              <input
                type='text'
                id='ID'
                name='userid'
                className='border w-full rounded-lg h-[2.75rem] px-3 placeholder:text-[#D9D9D9] placeholder:text-lg '
                placeholder='User Id'
                required
                // value={credentials.userid}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col justify-center w-full gap-2 mb-2">
              <label className='text-[#4E7690]'>Password (reduired)</label>
              <input
                type='password'
                id='password'
                name='password'
                required
                className='border w-full rounded-lg h-[2.75rem] px-3 placeholder:text-[#D9D9D9] placeholder:text-lg '
                // value={credentials.password}
                placeholder='Password'
                onChange={onChange}
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className='flex flex-row justify-center items-center gap-3'>
                <div className="border-2 border-gray-300 rounded w-5 h-5 flex flex-row justify-center items-center">
                  <input type='checkbox'
                    className='w-3 h-3  appearance-none  checked:bg-[#4E7690] '
                  />
                </div>


                <p className='text-sm'>Keep me logged In</p>
              </div>
              <p className='text-sm text-[#4E7690] underline font-medium'>Forgot Password</p>
            </div>
            <div className=" flex flex-row justify-center items-center mt-10">
              <button type='submit' className='text-white bg-[#4E7690] px-10 py-3 rounded-lg'>Login</button>
            </div>

          </form>

         </div>
          
          <p className='text-sm text-[#4E7690] font-medium bottom-0 '>Having an issue logging in ? <strong>HELP CENTER</strong></p>
        </div>

      </div>

      <div className='w-[40%] flex justify-end '>
        <img src={image1} alt='' className='h-screen w-[40rem]' />
      </div>
    </div>
  )
}
