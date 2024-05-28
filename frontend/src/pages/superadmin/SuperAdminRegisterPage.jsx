import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import image1 from "../../images/police.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@chakra-ui/react";


export default function SuperAdminRegisterPage() {
  const [credentials, setCredentials] = useState({name: "", username: "", password: "" });
  let navigate = useNavigate();

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);  

  const linkstart = location.pathname.substring(0, location.pathname.indexOf('-'));

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(`/superadmin-dashboard`);
    }
  }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const response = await fetch(
      "https://safety-features.onrender.com/api/admin/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: credentials.name,
          username: credentials.username,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json(); // in this case which is auth token
    // console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      setIsLoading(false);
      navigate("/superadmin-login"); //this is redirecting me to the home page after I login
      // console.log("Logged In SUCCESSFULLY", "success");
      toast.success("User Registered Successfully");
    } else {
      toast.error("Failed to Login, Invalid Credentials");
    }
  };

  const onChange = (e) => {
    console.log(e.target.name);
    //this is fucntion is one of its kind
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials);
  };

  if(isLoading) return (<div><Spinner/></div>);

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className="w-[60%] flex flex-row justify-center ">
        <div className=" flex flex-col w-[32rem] justify-evenly h-[40rem] items-center border-2 border-[#DADADA] rounded-3xl ">
          <div className="flex flex-col justify-center items-center w-[32rem] h-[90%]">
            <h1 className="text-2xl font-semibold mb-2">Register</h1>
            <p className="text-[#4E7690] mb-14 font-normal text-md">
              Create an account by entering the following details
            </p>
            <form onSubmit={handleSubmit} className="w-full px-10 ">
            <div className="flex flex-col justify-center w-full  gap-2 mb-4">
                <label className="text-[#4E7690]">User Name (Required)</label>
                <input
                  type="text"
                  id="ID"
                  name="name"
                  className="border w-full rounded-lg h-[2.75rem] px-3 placeholder:text-[#D9D9D9] placeholder:text-lg "
                  placeholder="User Name"
                  required
                  // value={credentials.username}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col justify-center w-full  gap-2 mb-4">
                <label className="text-[#4E7690]">User ID (Required)</label>
                <input
                  type="text"
                  id="ID"
                  name="username"
                  className="border w-full rounded-lg h-[2.75rem] px-3 placeholder:text-[#D9D9D9] placeholder:text-lg "
                  placeholder="User Id"
                  required
                  // value={credentials.username}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col justify-center w-full gap-2 mb-2">
                <label className="text-[#4E7690]">Password (Required)</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="border w-full rounded-lg h-[2.75rem] px-3 placeholder:text-[#D9D9D9] placeholder:text-lg "
                  // value={credentials.password}
                  placeholder="Password"
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col justify-center w-full gap-2 mb-2">
                <label className="text-[#4E7690]">Confirm Password (Required)</label>
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  required
                  className="border w-full rounded-lg h-[2.75rem] px-3 placeholder:text-[#D9D9D9] placeholder:text-lg "
                  // value={credentials.password}
                  placeholder="Confirm Password"
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-row justify-end items-center">
                <p className="text-sm text-[#4E7690] underline font-medium">
                  Forgot Password
                </p>
              </div>
              <div className=" flex flex-row justify-center items-center mt-6">
                <button
                  type="submit"
                  className="text-white bg-[#4E7690] px-10 py-3 rounded-lg"
                >
                  Register
                </button>
              </div>
            </form>
          </div>

          <p className="text-sm text-[#4E7690] font-medium bottom-0 ">
            Having an issue logging in ? <strong>HELP CENTER</strong>
          </p>
        </div>
      </div>

      <div className="w-[40%] flex justify-end ">
        <img src={image1} alt="" className="h-screen w-[40rem]" />
      </div>
    </div>
  );
}
