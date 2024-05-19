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
import Add from "../Add";

const AddLocationPopup = ({ open, setOpen }) => {
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [nestedOpen, setNestedOpen] = useState(false);
  const [doubleNestedOpen, setDoubleNestedOpen] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [options, setOptions] = useState({
    temporary: false,
    permanent: false,
  });
  const [name, setName] = useState();
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

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
      if (!city) {
        toast.error("Choose a value for city");
        return;
      }
      setCurrPage((prev) => prev + 1);
    }
    if (currPage === 2) {
      try {
        const postObj = {
          name: String(name),
          address: String(city),
          coordinates: [position?.lat, position?.lng],
          expiration: options?.permanent
            ? -1
            : Number(days * 24 * 60 + hours * 60),
        };
        console.log(Number(days * 24 * 60 + hours * 60));

        if (
          !name ||
          !city ||
          !position ||
          (options.permanent === false && options.temporary === false)
        ) {
          toast.error("Fill all the details");
          return;
        }
        const post = axios.post(
          "https://safety-features.onrender.com/api/place/addplace",
          postObj
        );
        setCurrPage((prev) => prev + 1);
        toast.success("Location added successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="fixed z-20">
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded shadow-lg w-[50vw] h-[80vh] flex flex-col overflow-hidden">
            {currPage === 1 && (
              <div className="flex flex-row gap-30">
                <div>
                  <h2 className="text-2xl mb-4 text-black">Add Location</h2>
                  <p className="text-[#4e7690] font-size-[14px] ">
                    Fill all the details given below to add the location
                  </p>
                  <h2>Details</h2>
                  <p className="text-[#4e7690]">
                    Note:Fields are editable and can be changed
                  </p>
                </div>
                <button
                  className="rounded-md text-[#4e7690]"
                  onClick={() => setOpen(false)}
                >
                  X
                </button>
              </div>
            )}
            {position.lat != null &&
              position.lng !== null &&
              currPage === 1 && (
                <div className="flex-1">
                  <Add
                    position={position}
                    setPosition={setPosition}
                    style={{ height: "50vh" }}
                    city={city}
                    setCity={setCity}
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
                        <div className="w-full">
                          <label htmlFor="name">Name</label>
                          <input
                            type="string"
                            id="name"
                            name="name"
                            className="border p-2 rounded"
                            placeholder="Police Station"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
