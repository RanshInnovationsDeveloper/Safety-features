import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { FaArrowDown } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import AddLocationPopup from "./AddLocationPopup";
import {
  calculateExpiration,
  calculateDistance,
} from "../../commonly used functions/functions";

function AdminDelete() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [queryedData, setQueryedData] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [query, setQuery] = useState("");

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
        // const items = await axios.get(
        //   "https://safety-features.onrender.com/api/place/fetchAllPlaces"
        // );

        const items = [
          {
            _id: "6648faf7efa520ca0da44704",
            name: "Test Place23",
            address: "456 Elm St",
            coordinates: [-4.98, -7],
            expiration: 60,
            author: "first user",
            createdAt: "2024-05-18T19:01:11.063Z",
            active: "2026-05-18T19:01:11.063Z",
            __v: 0,
          },
          {
            _id: "6648fbe2aa1a75b4a6c6f1c3",
            name: "",
            address: "Paris",
            coordinates: [48.86862129431144, 2.331778390512249],
            expiration: -1,
            author: "jnnjjbanklandskdsjljasndlajb",
            createdAt: "2024-05-18T19:05:06.762Z",
            active: "2025-05-18T19:05:06.762Z",
            __v: 0,
          },
          {
            _id: "6648fc58aa1a75b4a6c6f1d0",
            name: "",
            address: "Paris",
            coordinates: [48.8532588666427, 2.364336458826699],
            expiration: -1,
            author: "jnnjjbanklandskdsjljasndlajb",
            createdAt: "2024-05-18T19:07:04.093Z",
            active: "2025-05-18T19:07:04.093Z",
            __v: 0,
          },
          {
            _id: "6648fc8daa1a75b4a6c6f1d8",
            name: "",
            address: "Paris",
            coordinates: [48.84845820069552, 2.3360123316294334],
            expiration: -1,
            author: "jnnjjbanklandskdsjljasndlajb",
            createdAt: "2024-05-18T19:07:57.464Z",
            active: "2026-05-18T19:07:57.464Z",
            __v: 0,
          },
          {
            _id: "664b2ad447da9550d763b4ec",
            name: "Policio",
            address: "Parisanr tttt++Paris++Île-de-France++75001++France",
            coordinates: [48.85773648501677, 2.346835581970197],
            expiration: -1,
            author: "admin",
            createdAt: "2024-05-20T10:49:56.022Z",
            active: "2025-05-20T10:49:56.022Z",
            __v: 0,
          },
        ];
        // const deletedData = items?.data?.filter((item) => {
        const deletedData = items?.filter((item) => {
          return item?.active !== item?.createdAt;
        });
        setData(deletedData);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const newData = data?.map((item) => {
        const distance = calculateDistance(
          item?.coordinates[0],
          item?.coordinates[1],
          center
        );
        return { ...item, distance };
      });
      let groupedByActiveDate = {};
      newData.forEach((item) => {
        const activeDate = item?.active?.split("T")[0];
        if (groupedByActiveDate[activeDate]) {
          groupedByActiveDate[activeDate].push(item);
        } else {
          groupedByActiveDate[activeDate] = [item];
        }
        setProcessedData(groupedByActiveDate);
        setIsLoading(false);
      });
    }
  }, [data]);

  // This one is to query
  useEffect(() => {
    let trimmedQuery = query.trim();
    if (trimmedQuery === "") {
      setQueryedData(processedData);
      return;
    } else {
      let data = [];
      for (const [date, dataArray] of Object.entries(processedData)) {
        let tempArr = [];
        console.log(dataArray[0]);
        for (let i = 0; i < dataArray.length; i++) {
          if (
            dataArray[i]?.name.toLowerCase().includes(query.toLowerCase()) ||
            dataArray[i]?.address.toLowerCase().includes(query.toLowerCase())
          ) {
            tempArr.push(dataArray[i]);
          }
        }
        if (tempArr.length > 0) {
          data[date] = tempArr;
        }
      }
      console.log("data", data);
      setQueryedData(data);
    }
  }, [processedData, query]);

  const flatteningData = (data) => {
    let flatData = [];
    for (const [date, dataArray] of Object?.entries(data)) {
      flatData.push(date);
      for (const item of dataArray) {
        flatData.push(item);
      }
    }
    return flatData;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const allDataArray = flatteningData(queryedData);
  const currentRows = allDataArray?.slice(indexOfFirstRow, indexOfLastRow);
  const totalRows = allDataArray?.length;
  console.log(allDataArray);
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

  if (!isLoading && processedData?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold mb-2">No Data Found</h1>
        <p className="text-[#4E7690] mb-14 font-normal text-md">
          Delete some data to see it here
        </p>
      </div>
    );
  }

  //This function is to check if the value is an object
  function isObject(value) {
    return value && typeof value === "object" && value.constructor === Object;
  }
  return (
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class=" min-w-full inline-block align-middle">
          <div className="flex flex-row justify-between items-center px-2 py-3">
            <div className="flex flex-col items-start gap-1 justify-center">
              <h1 className=" text-lg font-semibold text-[#101828]">
                Deleted Locations
              </h1>
              <p className="text-sm font-normal text-[#4E7690]">
                These locations are deleted can be restored or will be
                completely deleted after 5 days
              </p>
            </div>
            <div className=" rounded-lg text-white bg-[#4E7690] py-3 px-2 items-center ">
              <button
                className="flex justify-center items-center  w-full gap-2"
                onClick={toggleOpen}
              >
                <FaPlus />
                <p className="text-[14px]">Add Location</p>
              </button>
            </div>
            <AddLocationPopup open={open} setOpen={setOpen} />
          </div>
          {!isLoading && processedData?.length === 0 ? (
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
                          <div className="flex gap-2 hover:cursor-pointer">
                            Location Name
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                        >
                          <div className="flex gap-2 hover:cursor-pointer ">
                            City
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                        >
                          <div className="flex gap-2 hover:cursor-pointer">
                            Distance
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                        >
                          <div className="flex gap-2 hover:cursor-pointer">
                            Status
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-[#4E7690]  "
                        >
                          <div className="flex gap-2 hover:cursor-pointer">
                            Deleted Time
                          </div>
                        </th>
                        <th
                          scope="col"
                          class="px-4 py-3 text-center text-xs font-medium text-[#4E7690] bg-[#DCE4E9]  "
                        >
                          Restore
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 ">
                      {currentRows?.map((row, index) =>
                        !isObject(row) ? (
                          <tr className="bg-[#6670851A] text-[#6C778B]">
                            <td class="py-3 ps-4">
                              <div class="flex items-center h-5">
                                <input
                                  id="hs-table-pagination-checkbox-1"
                                  type="checkbox"
                                  class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 "
                                />
                              </div>
                            </td>
                            <td
                              colSpan="7"
                              class="px-6 py-4 whitespace-nowrap text-sm font-medium "
                            >
                              {row && !isNaN(new Date(row))
                                ? new Date(row).toLocaleString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  })
                                : "Invalid date"}
                            </td>
                          </tr>
                        ) : (
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
                              {row?.name}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#4E7690] font-normal">
                              {row?.address?.split("++")[1]}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#4E7690] font-semibold ">
                              {row?.distance}
                            </td>
                            <td
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
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-[#4E7690] font-semibold ">
                              {new Date(row?.active).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>

                            <td class="px-4 py-4 whitespace-nowrap text-center text-sm font-medium bg-[#DCE4E9]">
                              <button
                                type="button"
                                class="inline-flex items-center  text-sm font-semibold rounded-lg border "
                              >
                                <RiDeleteBin4Fill className=" w-4 h-4 text-[#4E7690]" />
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div class="py-2 px-4 flex items-center justify-between">
                  <div className=" text-sm text-[#4E7690] font-medium">
                    <h1>
                      {indexOfFirstRow + 1} -
                      {totalRows < indexOfLastRow ? totalRows : indexOfLastRow}{" "}
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
  );
}

export default AdminDelete;
