import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { BsDash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import AddLocationPopup from "./AddLocationPopup";
import {
  calculateExpiration,
  calculateDistance,
} from "../../commonly used functions/functions";
import { useLocation } from "react-router-dom";
import CreateNewAccount from "./CreateNewAccount";

function AdminAccess() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [queryedData, setQueryedData] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [query, setQuery] = useState("");
  const [sortedOrder, setSortedOrder] = useState("asc-name");

  const location = useLocation();

  const linkstart = location.pathname.substring(
    0,
    location.pathname.indexOf("-")
  );

  //TODO:This function can be added to context and this data can be fetched straight form ocntext then
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  //This one fetches the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await axios.get(
          "https://safety-features.onrender.com/api/admin/fetchallusers"
        );
        setData(items?.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  console.log("Data", data);
  //This one is to query
  // useEffect(() => {
  //   // function to sort
  //   function sortData(dataArray) {
  //     // TODO:Have to work on sorting
  //     let sortedData = [];
  //     // if (sortedOrder === "asc-name") {
  //     //   sortedData = [...dataArray]?.sort((a, b) =>
  //     //     a.name?.localeCompare(b.name)
  //     //   );
  //     // }
  //     // if (sortedOrder === "desc-name") {
  //     //   sortedData = [...dataArray]?.sort((a, b) =>
  //     //     b.name?.localeCompare(a.name)
  //     //   );
  //     // }
  //     // if (sortedOrder === "asc-city") {
  //     //   sortedData = [...dataArray]?.sort((a, b) =>
  //     //     a.address?.split("++")[1]?.localeCompare(b.address.split("++")[1])
  //     //   );
  //     // }
  //     // if (sortedOrder === "desc-city") {
  //     //   sortedData = [...dataArray]?.sort((a, b) =>
  //     //     b.address?.split("++")[1]?.localeCompare(a.address.split("++")[1])
  //     //   );
  //     // }
  //     // if (sortedOrder === "asc-distance") {
  //     //   sortedData = [...dataArray]?.sort(
  //     //     (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
  //     //   );
  //     // }
  //     // if (sortedOrder === "desc-distance") {
  //     //   sortedData = [...dataArray]?.sort(
  //     //     (a, b) => parseFloat(b.distance) - parseFloat(a.distance)
  //     //   );
  //     // }
  //     // if (sortedOrder === "asc-status") {
  //     //   sortedData = [...dataArray]?.sort(
  //     //     (a, b) => a.expiration - b.expiration
  //     //   );
  //     // }
  //     // if (sortedOrder === "desc-status") {
  //     //   sortedData = [...dataArray]?.sort(
  //     //     (a, b) => b.expiration - a.expiration
  //     //   );
  //     // }
  //     // if (sortedOrder === "asc-time") {
  //     //   sortedData = [...dataArray]?.sort((a, b) => a.timeLeft - b.timeLeft);
  //     // }
  //     // if (sortedOrder === "desc-time") {
  //     //   sortedData = [...dataArray]?.sort((a, b) => b.timeLeft - a.timeLeft);
  //     // }
  //     return sortedData;
  //   }

  //   let trimmedQuery = query.trim();

  //   if (trimmedQuery === "") {
  //     const sortedData = sortData(data);
  //     setQueryedData(sortedData);
  //     return;
  //   }

  //   const filteredData = data?.filter(
  //     (item) =>
  //       item?.name?.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
  //       item?.phone?.includes(trimmedQuery)
  //   );
  //   const sortedData = sortData(filteredData);
  //   setQueryedData(sortedData);
  // }, [data, query, sortedOrder]);

  console.log("Queryed Data", queryedData);

  //Data to style
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const totalRows = data?.length;
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  return (
    <>
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class=" min-w-full inline-block align-middle">
            <div className="flex flex-row justify-between items-center px-2 py-3">
              <div className="flex flex-col items-start gap-1 justify-center">
                <h1 className=" text-lg font-semibold text-[#101828]">
                  Access
                </h1>
                <p className="text-sm font-normal text-[#4E7690]">
                  Safety Locations that are live on website
                </p>
              </div>
              <div className=" rounded-lg text-white bg-[#4E7690] py-3 px-2 items-center ">
                <button
                  className="flex justify-center items-center  w-full gap-2"
                  onClick={toggleOpen}
                >
                  <FaPlus />
                  <p className="text-[14px]">Create New Account</p>
                </button>
              </div>
              {/* <AddLocationPopup open={open} setOpen={setOpen} /> */}
              <CreateNewAccount open={open} setOpen={setOpen} />
            </div>
            {!isLoading && data?.length === 0 ? (
              <>
                <div className="flex flex-col justify-center items-center h-[60vh]">
                  <h1 className="text-2xl font-semibold mb-2">No Data Found</h1>
                  <p className="text-[#4E7690] mb-14 font-normal text-md">
                    Add some data to see it here
                  </p>
                </div>
              </>
            ) : (
              <>
                <div class="border rounded-lg divide-y divide-gray-200 px-4 ">
                  <div class="py-3 px-4 flex flex-row items-center justify-between ">
                    <div className="border border-gray-200 shadow-sm rounded-lg text-[#71839B] text-sm font-medium flex flex-row justify-center items-center">
                      <button className="px-3 py-2 border-r border-gray-200 hover:bg-[#4E76904D] hover:text-[#4E7690] rounded-l-lg">
                        Today
                      </button>
                      <button className="px-3 py-2 border-r border-gray-200 hover:bg-[#4E76904D] hover:text-[#4E7690]">
                        Last 7 days
                      </button>
                      <button className="px-3 py-2 rounded-r-lg hover:bg-[#4E76904D] hover:text-[#4E7690] ">
                        Custom Date
                      </button>
                    </div>
                    <div class="relative w-[400px]  ">
                      <label class="sr-only">Search</label>
                      <input
                        type="text"
                        class="py-3 px-3 ps-10 h-[44px] block w-full  border-[#D0D5DD] border shadow-sm rounded-lg text-base focus:outline-none disabled:opacity-50 disabled:pointer-events-none placeholder:text-[#D0D5DD] "
                        placeholder="Search ..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                        <svg
                          class="size-5 text-[#D0D5DD] "
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex gap-5 flex-row justify-center items-center">
                      <button className="px-3 py-3 text-[#4E7690] flex justify-center items-center gap-2 text-sm font-medium">
                        <img src="/filter-lines.svg" alt="filter" />
                        Filter
                      </button>
                      <button className="text-[#F44336] py-3 pl-3 pr-4  flex justify-center items-center text-sm font-medium gap-2 rounded-lg bg-[#FDEBEA]">
                        <AiOutlineDelete className=" w-5 h-5" />
                        Delete
                      </button>
                    </div>
                  </div>
                  <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-[#EAECF0] ">
                      <thead class="bg-[#FCFCFD] ">
                        <tr>
                          <th scope="col" class="py-3 px-4 pe-0">
                            <div class="flex items-center h-5">
                              <input
                                id="hs-table-pagination-checkbox-all"
                                type="checkbox"
                                class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 "
                              />
                              <label
                                for="hs-table-pagination-checkbox-all"
                                class="sr-only"
                              >
                                Checkbox
                              </label>
                            </div>
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                          >
                            <div
                              className="flex gap-2 hover:cursor-pointer"
                              onClick={() =>
                                sortedOrder === "asc-name"
                                  ? setSortedOrder("desc-name")
                                  : setSortedOrder("asc-name")
                              }
                            >
                              UserId
                              {sortedOrder === "asc-name" ? (
                                <FaArrowDown className="mt-0.5" />
                              ) : sortedOrder === "desc-name" ? (
                                <FaArrowUp className="mt-0.5" />
                              ) : (
                                <BsDash className="mt-0.5" />
                              )}
                            </div>
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                          >
                            <div
                              className="flex gap-2 hover:cursor-pointer"
                              onClick={() =>
                                sortedOrder === "asc-name"
                                  ? setSortedOrder("desc-name")
                                  : setSortedOrder("asc-name")
                              }
                            >
                              User Name
                              {sortedOrder === "asc-name" ? (
                                <FaArrowDown className="mt-0.5" />
                              ) : sortedOrder === "desc-name" ? (
                                <FaArrowUp className="mt-0.5" />
                              ) : (
                                <BsDash className="mt-0.5" />
                              )}
                            </div>
                          </th>
                          {/* <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                          >
                            <div
                              className="flex gap-2 hover:cursor-pointer "
                              onClick={() =>
                                sortedOrder === "asc-city"
                                  ? setSortedOrder("desc-city")
                                  : setSortedOrder("asc-city")
                              }
                            >
                              Phone Number
                              {sortedOrder === "asc-city" ? (
                                <FaArrowDown className="mt=0.5" />
                              ) : sortedOrder === "desc-city" ? (
                                <FaArrowUp className="mt=0.5" />
                              ) : (
                                <BsDash className="mt-0.5" />
                              )}
                            </div>
                          </th> */}
                          {/* <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                          >
                            <div
                              className="flex gap-2 hover:cursor-pointer"
                              onClick={() =>
                                sortedOrder === "asc-distance"
                                  ? setSortedOrder("desc-distance")
                                  : setSortedOrder("asc-distance")
                              }
                            >
                              All Access
                              {sortedOrder === "asc-distance" ? (
                                <FaArrowDown className="mt=0.5" />
                              ) : sortedOrder === "desc-distance" ? (
                                <FaArrowUp className="mt=0.5" />
                              ) : (
                                <BsDash className="mt-0.5" />
                              )}
                            </div>
                          </th> */}
                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                          >
                            <div
                              className="flex gap-2 hover:cursor-pointer"
                              onClick={() =>
                                sortedOrder === "asc-status"
                                  ? setSortedOrder("desc-status")
                                  : setSortedOrder("asc-status")
                              }
                            >
                              Last Seen
                              {sortedOrder === "asc-status" ? (
                                <FaArrowDown className="mt=0.5" />
                              ) : sortedOrder === "desc-status" ? (
                                <FaArrowUp className="mt=0.5" />
                              ) : (
                                <BsDash className="mt-0.5" />
                              )}
                            </div>
                          </th>

                          <th
                            scope="col"
                            class="px-4 py-3 text-center text-xs font-medium text-[#f44336] bg-[#F3CFCE]  "
                          >
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 ">
                        {currentRows?.map((row, index) => (
                          <tr key={index}>
                            <td class="py-3 ps-4">
                              <div class="flex items-center h-5">
                                <input
                                  id="hs-table-pagination-checkbox-1"
                                  type="checkbox"
                                  class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 "
                                />
                                <label
                                  for="hs-table-pagination-checkbox-1"
                                  class="sr-only"
                                >
                                  Checkbox
                                </label>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#101828] ">
                              {row?.userid}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#4E7690] font-normal">
                              {row?.name}
                            </td>
                            {/* <td class="px-6 py-4 whitespace-nowrap text-sm text-[#4E7690] font-semibold ">
                              {row?.distance}
                            </td> */}
                            {/* <td
                              class={`px-4 py-3 whitespace-nowrap text-sm  text-gray-800 `}
                            >
                              <h1
                                className={`w-fit flex flex-row gap-1 justify-center items-center rounded-[50px] py-1 px-3 ${
                                  row?.expiration === -1
                                    ? "text-[#037847]  bg-[#ECFDF3]"
                                    : "text-[#364254] bg-[#F2F4F7]"
                                }`}
                              >
                                <GoDotFill className="  rounded-full" />
                                {row?.expiration === -1
                                  ? "Permanent"
                                  : "Temporary"}
                              </h1>
                            </td> */}
                            {(() => {
                              const date = new Date(row?.date);
                              const now = new Date();
                              const day = String(date.getDate()).padStart(
                                2,
                                "0"
                              );
                              const month = String(
                                date.getMonth() + 1
                              ).padStart(2, "0"); // Months are 0-based
                              const year = date
                                .getFullYear()
                                .toString()
                                .substr(-2);
                              const hours = String(date.getHours()).padStart(
                                2,
                                "0"
                              );
                              const minutes = String(
                                date.getMinutes()
                              ).padStart(2, "0");
                              const diffInDays = Math.floor(
                                (now - date) / (1000 * 60 * 60 * 24)
                              );
                              const formattedDate =
                                diffInDays > 1
                                  ? `${day}/${month}/${year}`
                                  : `${day}/${month}/${year} ${hours}:${minutes}`;

                              return (
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#4E7690] font-semibold ">
                                  {formattedDate}
                                </td>
                              );
                            })()}
                            <td class="px-4 py-4 whitespace-nowrap text-center text-sm font-medium bg-[#FDEBEA]">
                              <button
                                type="button"
                                class="inline-flex items-center  text-sm font-semibold rounded-lg border "
                              >
                                <MdDeleteOutline className=" w-4 h-4 text-[#F44336]" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div class="py-2 px-4 flex items-center justify-between">
                    <div className=" text-sm text-[#4E7690] font-medium">
                      <h1>
                        {indexOfFirstRow + 1} -
                        {totalRows < indexOfLastRow
                          ? totalRows
                          : indexOfLastRow}{" "}
                        of
                        {totalRows} items
                      </h1>
                    </div>
                    <nav class="flex items-center space-x-1 gap-2">
                      <button
                        type="button"
                        class="px-3 py-2 rounded-lg border border-gray-200 shadow-sm text-[#71839B] font-medium text-sm hover:bg-[#4E76904D] hover:text-[#4E7690]"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <span aria-hidden="true">Previous</span>
                        <span class="sr-only">Previous</span>
                      </button>

                      <button
                        type="button"
                        class="px-3 py-2 border border-gray-200 shadow-sm text-[#71839B] font-medium  text-sm rounded-lg hover:bg-[#4E76904D] hover:text-[#4E7690] "
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <span aria-hidden="true">Next</span>
                      </button>
                    </nav>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAccess;
