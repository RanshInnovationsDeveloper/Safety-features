// // import React, { useState } from 'react';
// // import { Modal, Button } from '@material-ui/core';

// // const AddLocationPopup = () => {
// //     const [open, setOpen] = useState(false);
// //     const [nestedOpen, setNestedOpen] = useState(false);
// //     const [doubleNestedOpen, setDoubleNestedOpen] = useState(false);

// //     const handleOpen = () => {
// //         setOpen(true);
// //     };

// //     const handleClose = () => {
// //         setOpen(false);
// //     };

// //     const handleNestedOpen = () => {
// //         setNestedOpen(true);
// //     };

// //     const handleNestedClose = () => {
// //         setNestedOpen(false);
// //     };

// //     const handleDoubleNestedOpen = () => {
// //         setDoubleNestedOpen(true);
// //     };

// //     const handleDoubleNestedClose = () => {
// //         setDoubleNestedOpen(false);
// //     };

// //     return (
// //         <div>
// //             <Button variant="contained" color="primary" onClick={handleOpen}>
// //                 Open Modal
// //             </Button>

// //             <Modal open={open} onClose={handleClose}>
// //                 <div>
// //                     <h2>Outer Modal</h2>
// //                     <Button variant="contained" color="primary" onClick={handleNestedOpen}>
// //                         Open Nested Modal
// //                     </Button>

// //                     <Modal open={nestedOpen} onClose={handleNestedClose}>
// //                         <div>
// //                             <h2>Nested Modal</h2>
// //                             <Button variant="contained" color="primary" onClick={handleDoubleNestedOpen}>
// //                                 Open Double Nested Modal
// //                             </Button>

// //                             <Modal open={doubleNestedOpen} onClose={handleDoubleNestedClose}>
// //                                 <div>
// //                                     <h2>Double Nested Modal</h2>
// //                                     <p>This is the content of the double nested modal.</p>
// //                                 </div>
// //                             </Modal>
// //                         </div>
// //                     </Modal>
// //                 </div>
// //             </Modal>
// //         </div>
// //     );
// // };

// // export default AddLocationPopup;

// import React, { useState } from 'react';

// const AddLocationPopup = ({name}) => {
//     const [open, setOpen] = useState(false);
//     const [nestedOpen, setNestedOpen] = useState(false);
//     const [doubleNestedOpen, setDoubleNestedOpen] = useState(false);

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleNestedOpen = () => {
//         setNestedOpen(true);
//     };

//     const handleNestedClose = () => {
//         setNestedOpen(false);
//     };

//     const handleDoubleNestedOpen = () => {
//         setDoubleNestedOpen(true);
//     };

//     const handleDoubleNestedClose = () => {
//         setDoubleNestedOpen(false);
//     };

//     return (
//         <div>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpen}>

//                 {name}
//             </button>

//             {open && (
//                 <div className="fixed inset-0 flex items-center justify-center">
//                     <div className="bg-white p-8 rounded shadow-lg">
//                         <h2 className="text-2xl mb-4">Outer Modal</h2>
//                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNestedOpen}>
//                             Open Nested Modal
//                         </button>

//                         {nestedOpen && (
//                             <div className="fixed inset-0 flex items-center justify-center">
//                                 <div className="bg-white p-8 rounded shadow-lg">
//                                     <h2 className="text-2xl mb-4">Nested Modal</h2>
//                                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDoubleNestedOpen}>
//                                         Open Double Nested Modal
//                                     </button>

//                                     {doubleNestedOpen && (
//                                         <div className="fixed inset-0 flex items-center justify-center">
//                                             <div className="bg-white p-8 rounded shadow-lg">
//                                                 <h2 className="text-2xl mb-4">Double Nested Modal</h2>
//                                                 <p>This is the content of the double nested modal.</p>
//                                                 <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDoubleNestedClose}>
//                                                     Close Double Nested Modal
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddLocationPopup;
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AddLocationMap from "./AddLocationMap";
const AddLocationPopup = ({ open, setOpen }) => {
  // const [position, setPosition] = useState({ lat: null, lng: null });
  const [nestedOpen, setNestedOpen] = useState(false);
  const [doubleNestedOpen, setDoubleNestedOpen] = useState(false);
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
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setPosition({
  //         lat: position?.coords?.latitude,
  //         lng: position?.coords?.longitude,
  //       });
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //     toast.error("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  //   const handleNestedOpen = () => {
  //     setNestedOpen(true);
  //   };

  //   const handleNestedClose = () => {
  //     setNestedOpen(false);
  //   };

  //   const handleDoubleNestedOpen = () => {
  //     setDoubleNestedOpen(true);
  //   };

  //   const handleDoubleNestedClose = () => {
  //     setDoubleNestedOpen(false);
  //   };

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
    <div className="fixed z-20">
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded shadow-lg w-[50vw] h-[80vh] flex flex-col overflow-hidden">
          {currPage === 1 && (
  <div className="flex flex-row gap-30">
    <div className="overflow-y-auto max-h-[calc(100vh-2rem)]">
      <h2 className="text-2xl mb-4 text-black">Add Location</h2>
      <p className="text-[#4e7690] font-size-[14px] ">
        Fill all the details given below to add the location
      </p>
      <h2>Details</h2>
      <p className="text-[#4e7690]">
        Note:Fields are editable and can be changed
      </p>
                  {/* //Scroll waala part */}
                  <div className="flex space-x-4">
    <div className="space-y-2 flex-1">
      <label htmlFor="placename" className="block text-gray-700">Place Name (required)</label>
      <input name="placename" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Eg:Police Station" className="w-full p-2 border border-gray-300 rounded"/>
    </div>
    <div className="space-y-2 flex-1">
      <label htmlFor="category" className="block text-gray-700">Category (required)</label>
      <select name="category" className="w-full p-2 border border-gray-300 rounded" value={category} onChange={(e)=>setCategory(e.target.value)}>
        <option value="police-station">Police Station</option>
        <option value="hospital">Hospital</option>
      </select>
    </div>
  </div>
  <label htmlFor="address" className="block text-gray-700">Address(required)</label>
  <input name="address" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="city"  className="block text-gray-700">City (required)</label>
      <input name="city" type="text" onChange={(e)=>setCity(e.target.value)} value={city} placeholder="Eg: Jaipur" className="w-full p-2 border border-gray-300 rounded"/>
      <label htmlFor="pincode" className="block text-gray-700">Pincode (required)</label>
      <input name="pincode" type="text" onChange={(e)=>setPincode(e.target.value)} value={pincode} placeholder="Eg: Jaipur" className="w-full p-2 border border-gray-300 rounded"/>
    </div>
    <div>
      <label htmlFor="state" className="block text-gray-700">State (required)</label>
      <input name="state" type="text" onChange={(e)=>setState(e.target.value)} value={state} placeholder="Eg: Rajasthan" className="w-full p-2 border border-gray-300 rounded"/>
      <label htmlFor="country" className="block text-gray-700">Country/Region(required)</label>
      <input name="country" type="text" onChange={(e)=>setCountry(e.target.value)} value={country} placeholder="Eg: India" className="w-full p-2 border border-gray-300 rounded"/>
    </div>
  </div>
                </div>
                <button
                  className="rounded-md text-[#4e7690]"
                  onClick={() => setOpen(false)}
                >
                  X
                </button>
              </div>
            )}
            
              {currPage === 1 && (
                <div className="flex-1">
                  <AddLocationMap
                    style={{ height: "100%", width: "100%" }} //This is going ot main div of the map
                    setCity={setCity}
                    setPincode={setPincode}
                    setState={setState}
                    setCountry={setCountry}
                    setCoordinates={setCoordinates}
                    setName={setName}
                    setAddress={setAddress}
                  />

                </div>

              )}

            {currPage === 2 && (
              <div className="flex flex-col ">
                <div className="flex flex-row justify-between items-start gap-30">
                  <div>
                    <h2 className="text-2xl mb-4 text-black">Category</h2>
                    <p className="text-[#4e7690] font-size-[14px] ">
                      Select time till how much you want ot see the location
                    </p>
                    <div className="mt-4">
                      <p>Select an option</p>
                      <label>
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
                        />
                        Permanent
                      </label>
                      <br />
                      <label>
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
                        />
                        Temporary
                      </label>
                      <p>
                        (Note : Temporary selection would be only visible till
                        the time that will be entered.)
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "50%",
                          marginBottom: "5px",
                        }}
                      >
                        <div className="mr-4">
                          <label htmlFor="days">Days</label>
                          <input
                            type="number"
                            id="days"
                            name="days"
                            className="border p-2 rounded"
                            placeholder="Eg: 2 days"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            disabled={options?.permanent}
                          />
                        </div>
                        <div>
                          <label htmlFor="hours">Hours</label>
                          <input
                            type="number"
                            id="hours"
                            name="hours"
                            className="border p-2 rounded"
                            placeholder="Eg: 2 hours"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            disabled={options?.permanent}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="rounded-md text-[#4e7690]"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            )}

            {currPage === 3 && (
              <div className="relative flex items-center justify-center h-screen">
                <div className="flex justify-center items-center flex-col">
                  <img
                    src="/successfully-created.svg"
                    alt="Successfully created"
                  />
                  <h2>Location Successfully created</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-[#4e7690] text-white flex items-center justify-center rounded-md px-4 py-2 mt-4"
                  >
                    Finish
                  </button>
                  <p
                    className="text-[#4e7690] underline hover:cursor-pointer "
                    onClick={() => setCurrPage(1)}
                  >
                    Add another Location
                  </p>
                </div>
                <button
                  className="absolute top-4 right-4"
                  onClick={() => setOpen(false)}
                >
                  X
                </button>
              </div>
            )}
            <div
              className={`flex justify-between items-end w-full ${
                currPage === 3 ? "hidden" : ""
              }`}
            >
              <button
                className="border border-black px-4 py-2 rounded-md"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="rounded-lg text-white bg-[#4E7690] py-3 px-5"
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
