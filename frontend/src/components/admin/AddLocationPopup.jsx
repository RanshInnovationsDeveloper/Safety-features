
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AddLocationMap from "./AddLocationMap";
import { IoCloseCircleSharp, IoSearchCircleSharp } from "react-icons/io5";
import "../styles/User.css";
const AddLocationPopup = ({ open, setOpen, fetchData }) => {
  // const [position, setPosition] = useState({ lat: null, lng: null });

  const [currPage, setCurrPage] = useState(1);
  const [options, setOptions] = useState({
    temporary: false,
    permanent: false,
  });
  const [category, setCategory] = useState("police-station");
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [name, setName] = useState();
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const author=(localStorage.getItem("token")); 

  const handleBack = () => {
    if (currPage > 1) {
      setCurrPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currPage === 1) {
      if (!name || !city || !address || !pincode || !state || !country) {
        toast.error("Please Fill All Values");
        return;
      }

      if (coordinates?.lat=="" || coordinates?.lng=="" ) {
        console.log("coordinates", coordinates)
        toast.error("Please select location on map");
        return;
      }

      setCurrPage((prev) => prev + 1);
    }
    if (currPage === 2) {
      const coordinate=[coordinates?.lat,coordinates?.lng]
        const postObj = {
          name: String(name),
          address:`${address}++${city}++${state}++${pincode}++${country}`, //address=address+city+state+pincode+country
          coordinates: coordinate,
          expiration: options?.permanent
            ? -1
            : Number((days * 24 * 60) + (hours * 60)),
          author:author
        };
        // console.log(Number(days * 24 * 60 + hours * 60));

        if (
          !name ||
          !city ||
          (options.permanent === false && options.temporary === false)
        ) {
          toast.error("Fill all the details");
          return;
        }
        console.log("PostObj",postObj)
        axios.post(
          "https://safety-features.onrender.com/api/place/addplace",
          postObj
        ).then((res) => {
          toast.success("Location added successfully");
          setCurrPage((prev) => prev + 1);
          setCoordinates({ lat: "", lng: "" });
          setName("");
          setHours(0);
          setDays(0);
          setCity("");
          setAddress("");
          setPincode("");
          setState("");
          setCountry("");
        }).catch((err) => {
          console.log(err);
          toast.error(err.message);
         } );
        
    }
  };

  return (
    <div className="fixed z-30">
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-gray-500 z-10 opacity-40"></div>
          <div className="bg-white py-6 px-10 rounded-[30px] shadow-lg w-[40rem] h-[35rem] z-20 flex flex-col justify-between items-center gap-8 ">
          {currPage === 1 && (
  <div className="flex flex-col  w-[36rem] h-[85%]   ">
        <div className="flex flex-row justify-between">
      <h2 className=" text-lg font-semibold text-[#101828]">Add Location</h2>
      <div className="rounded-full shadow-lg w-8 flex justify-center bg-[#4E7690] items-center h-8"
         onClick={() => setOpen(false)}
      >
      <button
                  className=" text-[#4e7690]"
                  onClick={() => setOpen(false)}
                >
                  <IoCloseCircleSharp className="text-white w-10 h-10"/>
                </button>
      </div>
     
      </div>
      
      <p className="text-[#4E7690] text-sm font-normal ">
        Fill all the details given below to add the location
      </p>
    <div className="overflow-y-auto no-scrollbar">
    <div className="mt-3 flex justify-center items-center">
                  <AddLocationMap
                    style={{ height: "20rem", width: "36rem" }} //This is going ot main div of the map
                    setCity={setCity}
                    setPincode={setPincode}
                    setState={setState}
                    setCountry={setCountry}
                    setCoordinates={setCoordinates}
                    setName={setName}
                    setAddress={setAddress}
                    className="border border-green-500"
                  />

                </div>
      <h2 className="text-lg font-semibold text-[#101828]">Details</h2>
      <p className="text-[#4E7690] text-sm font-normal ">
        Note: Fields are editable and can be changed
      </p>
                  {/* //Scroll waala part */}
                  <div className="flex space-x-4 mt-2">
    <div className="space-y-2 flex-1 z-10 ">
      <label htmlFor="placename" className="block text-[#4E7690] text-sm font-medium">Place Name (required)</label>
      <input name="placename" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Eg:Police Station" className="w-full p-2 border border-[#D0D5DD] rounded-lg"/>
    </div>
    <div className="space-y-2 flex-1 z-10">
      <label htmlFor="category" className="block text-[#4E7690] text-sm font-medium">Category (required)</label>
      <div className="custom-select-wrapper">
      <select name="category" className="w-full p-2 border custom-select border-[#D0D5DD] rounded-lg" value={category} onChange={(e)=>setCategory(e.target.value)}>
        <option value="police-station">Police Station</option>
        <option value="hospital">Hospital</option>
      </select>
      </div>
      
    </div>
  </div>
  <div className="mt-2">
  <label htmlFor="address" className="block text-[#4E7690] text-sm font-medium">Address(required)</label>
  <input name="address" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full p-2 border border-[#D0D5DD] rounded-lg"/>
  </div>
  
  <div className="grid grid-cols-2 gap-4 mt-2">
    <div className="">
      <label htmlFor="city"  className="block text-[#4E7690] text-sm font-medium">City (required)</label>
      <input name="city" type="text" onChange={(e)=>setCity(e.target.value)} value={city} placeholder="Eg: Jaipur" className="w-full p-2 border border-[#D0D5DD] rounded-lg"/>
      <label htmlFor="state" className="block text-[#4E7690] text-sm font-medium mt-2">State (required)</label>
      <input name="state" type="text" onChange={(e)=>setState(e.target.value)} value={state} placeholder="Eg: Rajasthan" className="w-full p-2 border border-[#D0D5DD] rounded-lg"/>
    </div>
    <div className="">
    <label htmlFor="pincode" className="block text-[#4E7690] text-sm font-medium ">Pincode (required)</label>
      <input name="pincode" type="text" onChange={(e)=>setPincode(e.target.value)} value={pincode} placeholder="Eg: Jaipur" className="w-full p-2 border border-[#D0D5DD] rounded-lg"/>     
      <label htmlFor="country" className="block text-[#4E7690] text-sm font-medium mt-2">Country/Region(required)</label>
      <input name="country" type="text" onChange={(e)=>setCountry(e.target.value)} value={country} placeholder="Eg: India" className="w-full p-2 border border-[#D0D5DD] rounded-lg"/>
    </div>
  </div>
  
                </div>
              
              </div>
            )}
            

            {currPage === 2 && (
              <div className="flex flex-col ">
                <div className="flex flex-row justify-between items-start gap-30">
                  <div>
                    <div className="flex flex-row justify-between">
                    <h2 className="text-lg font-semibold text-[#101828]">Category</h2>
                    <div className="rounded-full shadow-lg w-8 flex justify-center bg-[#4E7690] items-center h-8">
                    <button
                  className=" text-[#4e7690]"
                  onClick={() => setOpen(false)}
                   >
                  <IoCloseCircleSharp className="text-white w-10 h-10"/>
                </button>
                </div>
                    </div>
                    
                    <p className="text-[#4E7690] text-sm font-normal  ">
                      Select time till how much you want ot see the location
                    </p>
                    <div className="mt-8 gap-8 flex flex-col">
                      <p className="text-[#4E7690] text-sm font-medium ">Select an option</p>
                      <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-4">
                      <div className="flex flex-row gap-2 ">
                      <input
                          type="radio"
                          value="permanent"
                          checked={options?.permanent}
                          onClick={() =>
                            setOptions({
                              temporary: false,
                              permanent: true,
                            })
                          }
                          className="w-5 h-5 red-radio"
                        />
                      <label className="text-sm font-medium text-[#101828]">
                        Permanent
                      </label>

                      </div>
                      <div className="flex flex-row gap-2">
                      <input
                          type="radio"
                          value="temporary"
                          checked={options?.temporary}
                          onClick={() =>
                            setOptions({
                              temporary: true,
                              permanent: false,
                            })
                          }
                          className="w-5 h-5 red-radio"
                        />
                      <label className="text-sm font-medium text-[#101828]">
                        Temporary
                      </label>
                      </div>
                     
                      </div>
                      <p className=" font-medium text-sm text-[#6C6C6C]">
                        (Note : Temporary selection would be only visible till
                        the time that will be entered.)
                      </p>
                      </div>

                       
                      
               
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "50%",
                          marginBottom: "5px",
                        }}
                      >
                        <div className="mr-4">
                          <label htmlFor="days" className="text-[#4E7690] text-sm font-medium disabled:cursor-not-allowed">Days (required)</label>
                          <input
                            type="number"
                            id="days"
                            name="days"
                            className="border border-[#D0D5DD] w-[16rem] p-2 h-[2.5rem] rounded-lg bg-transparent placeholder:text-[#D9D9D9] disabled:opacity-55 disabled:cursor-not-allowed"
                            placeholder="Eg: 2 days"
                            value={days}
                            min={0}
                            onChange={(e) => setDays(e.target.value)}
                            disabled={options?.permanent}
                          />
                        </div>
                        <div className="gap-2">
                          <label htmlFor="hours" className="text-[#4E7690] text-sm font-medium disabled:cursor-not-allowed">Hours</label>
                          <input
                            type="number"
                            id="hours"
                            name="hours"
                            className="border border-[#D0D5DD] p-2 rounded-lg w-[16rem] h-[2.5rem] bg-transparent disabled:opacity-55 placeholder:text-[#D9D9D9] disabled:cursor-not-allowed"
                            placeholder="Eg: 2 hours"
                            value={hours}
                            min={1}
                            onChange={(e) => setHours(e.target.value)}
                            disabled={options?.permanent}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {currPage === 3 && (
              <>
              <div className="flex flex-col h-full w-full  ">
                <div className="w-full items-start flex  justify-end  h-[12%] ">
                <div className="rounded-full shadow-lg w-8 flex justify-center bg-[#4E7690] items-center h-8">
                    <button
                  className=" text-[#4e7690]"
                  onClick={() => {setOpen(false)
                  setCurrPage(1)
                  }}
                   >
                  <IoCloseCircleSharp className="text-white w-10 h-10"/>
                </button>
                </div>
                </div>
                <div className="flex flex-col  gap-4  justify-center items-center">
                  <img 
                  src="/successfully-created.svg"
                  alt="Successfully created"
                  className="w-[20rem] h-[17rem]"
                  />
                  <h2 className=" font-semibold text-lg text-[#101828]">Location successfully created</h2>
                  <button
                    onClick={() => {
                      setOpen(false)
                      fetchData();
                    setCurrPage(1)
                    }}
                    className="bg-[#4e7690] text-white rounded-lg w-[6rem] h-[2.5rem] text-sm font-medium"
                  >
                    Finish
                  </button>
                  <p
                    className="text-[#4e7690] font-medium text-base underline hover:cursor-pointer "
                    onClick={() => setCurrPage(1)}
                  >
                    Add another Location
                  </p>
                </div>
              </div>
              </>

            )}
            <div
              className={`flex justify-between items-end w-full  ${
                currPage === 3 ? "hidden" : ""
              }`}
            >
              <button
                className="border border-[#4E7690] text-[#4E7690] px-8 py-2 rounded-lg text-sm"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="rounded-lg font-medium text-sm text-white bg-[#4E7690] py-2 px-8"
                onClick={handleNext}
              >
                {currPage == 1 ? "Next" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLocationPopup;
