import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AddLocationMap from "./AddLocationMap";
import { useAccordionItemState } from "@chakra-ui/react";
const CreateNewAccount = ({ open, setOpen }) => {
  // const [position, setPosition] = useState({ lat: null, lng: null });
  const [nestedOpen, setNestedOpen] = useState(false);
  const [doubleNestedOpen, setDoubleNestedOpen] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [userName, setUserName] = useState();
  const [name, setName] = useState();
  const [userId, setUserId] = useState(" ");
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const author = localStorage.getItem("token");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
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
      if (!userName || !userId || !password) {
        toast.error("Please Fill All Values");
        return;
      }

      if (userName.length < 5) {
        toast.error("Min length for user name is 5");
      }
      if (userId.length < 3) {
        toast.error("Min length for user name is 3");
      }

      if (coordinates?.lat == "" || coordinates?.lng == "") {
        console.log("coordinates", coordinates);
        toast.error("Please select location on map");
        return;
      } else {
        const coordinate = [coordinates?.lat, coordinates?.lng];
        const postObj = {
          name: userName,
          userid: userId,
          coordinates: coordinate,
          password: password,
        };

        axios
          .post(
            "https://safety-features.onrender.com/api/admin/createuser",
            postObj
          )
          .then((res) => {
            toast.success("Location added successfully");
            setCurrPage((prev) => prev + 1);
            setCoordinates({ lat: "", lng: "" });
            setHours(0);
            setDays(0);
            setCity("");
            setAddress("");
            setPincode("");
            setState("");
            setCountry("");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
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
                <div className="overflow-y-auto max-h-[calc(100vh-2rem)]">
                  <h2 className="text-2xl mb-4 text-black">Add Location</h2>
                  <p className="text-[#4e7690] font-size-[14px] ">
                    Fill all the details given below to add a new user
                  </p>
                  <h2>Details</h2>
                  <p className="text-[#4e7690]">
                    Note:Fields are editable and can be changed
                  </p>
                  {/* //Scroll waala part */}
                  <div className="flex space-x-4">
                    <div className="space-y-2 flex-1">
                      <label htmlFor="userId" className="block text-gray-700">
                        User Id (required and min length 3)
                      </label>
                      <input
                        name="userId"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Eg:Police Station"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label htmlFor="username" className="block text-gray-700">
                        User Name (required and min length 5)
                      </label>
                      <input
                        name="username"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <label htmlFor="passsword" className="block text-gray-700">
                    Password (required)
                  </label>
                  <input
                    name="password"
                    type={isVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button onClick={() => setIsVisible((prev) => !prev)}>
                    {isVisible ? "Hide" : "Show"}
                  </button>
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
              <div className="relative flex items-center justify-center h-screen">
                <div className="flex justify-center items-center flex-col">
                  <img
                    src="/successfully-created.svg"
                    alt="Successfully created"
                  />
                  <h2>User Successfully created</h2>
                  <button
                    onClick={() => setOpen(false) && setCurrPage(1)}
                    className="bg-[#4e7690] text-white flex items-center justify-center rounded-md px-4 py-2 mt-4"
                  >
                    Finish
                  </button>
                  <p
                    className="text-[#4e7690] underline hover:cursor-pointer "
                    onClick={() => setCurrPage(1)}
                  >
                    Add another User
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
                currPage === 2 ? "hidden" : ""
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
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewAccount;
