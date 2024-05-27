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
import "../styles/User.css";
import { LuMinusSquare } from "react-icons/lu";
import Spinner from "../Spinner";

function AdminDelete() {
  const [processedData, setProcessedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [queryedData, setQueryedData] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [query, setQuery] = useState("");
  const [checkedRows, setCheckedRows] = useState({});

  const [selectedRows, setSelectedRows] = useState([]);

  const handleNonObjectCheckboxChange = (index) => {
    const newCheckedRows = { ...checkedRows };
    const isChecked = !newCheckedRows[index];

    // Update the state of the current non-object row
    newCheckedRows[index] = isChecked;

    // Update the state of subsequent object rows until the next non-object row
    for (let i = index + 1; i < currentRows.length; i++) {
      if (!isObject(currentRows[i])) {
        break;
      }
      newCheckedRows[i] = isChecked;
      handleSelect(currentRows[i]?._id);
    }

    setCheckedRows(newCheckedRows);
    console.log(newCheckedRows)
  };

  const handleObjectCheckboxChange = (index, id) => {
    const newCheckedRows = { ...checkedRows };
    newCheckedRows[index] = !newCheckedRows[index];
    setCheckedRows(newCheckedRows);
    handleSelect(id);
  };



  const handleSelect = (rowIndex) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowIndex)) {
        return prevSelected.filter((index) => index !== rowIndex);
      } else {
        return [...prevSelected, rowIndex];
      }
    });
  };


  const clearSelection = () => {
    setSelectedRows([]);
    const newCheckedRows = {};
    Object.keys(checkedRows).forEach(key => {
      newCheckedRows[key] = false;
    });
    setCheckedRows(newCheckedRows);
    console.log(checkedRows)
  };

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
  const fetchData = async () => {
    try {
      const items = await axios.get(
        "https://safety-features.onrender.com/api/place/fetchAllPlaces"
      );
      const deletedData = items?.data?.filter((item) => {
         return item?.active!==item?.createdAt;
      })
      setData(deletedData);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  //This one fetches the data from the API
  useEffect(() => {

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
        setQueryedData(processedData)
        return; 
  }
       else {
        let data=[]
        for (const [date, dataArray] of Object.entries(processedData)) {
          let tempArr=[]
          console.log(dataArray[0])
          for (let i=0;i<dataArray.length;i++){
            if(dataArray[i]?.name.toLowerCase().includes(query.toLowerCase()) || dataArray[i]?.address.toLowerCase().includes(query.toLowerCase())){
              tempArr.push(dataArray[i])
            }
          }
          if (tempArr.length>0){
            data[date]=tempArr
          }
        }
        console.log("data",data)
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
}


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const allDataArray = flatteningData(queryedData);
  const currentRows = allDataArray?.slice(indexOfFirstRow, indexOfLastRow);

  const totalRows = allDataArray?.filter(item => isObject(item)).length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  console.log(allDataArray)
  const [open, setOpen] = useState(false);
const toggleOpen = () => {
    setOpen(!open);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteSelectedRows = async () => {
    setIsLoading(true);
    try {

      // const selectedRowIds = selectedRows.map(row => row._id);
      const promises = selectedRows.map(id => axios.delete(`https://safety-features.onrender.com/api/place/deleteplace/${id}`));
      await Promise.all(promises);
    clearSelection();
      fetchData();
      // Handle success
    } catch (error) {
      // Handle error
      toast.error(error.message);
    }
  };

  // const handleNonObjectCheckboxChange = (index) => {
  //   const newCheckedRows = { ...selectedRows };
  //   const isChecked = !newCheckedRows[index];

  //   // Update the state of the current non-object row
  //   newCheckedRows[index] = isChecked;

  //   // Update the state of subsequent object rows until the next non-object row
  //   for (let i = index + 1; i < currentRows.length; i++) {
  //     if (!isObject(currentRows[i])) {
  //       break;
  //     }
  //     newCheckedRows[i] = isChecked;
  //   }

  //   selectedRows(newCheckedRows);
  // };

  if (isLoading) {
    return <h1> <Spinner/></h1>;
  }



  //This function is to check if the value is an object
  function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }

console.log(currentRows);
  return(
    <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class=" min-w-full inline-block align-middle">
        <div className="flex flex-row justify-between items-center px-2 py-3">
          <div className="flex flex-col items-start gap-1 justify-center">
            <h1 className=" text-lg font-semibold text-[#101828]">
              Deleted Locations
            </h1>
            <p className="text-sm font-normal text-[#4E7690]">
            Lorem ipsum dolor sit amet consectetur.
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
        {(!isLoading && processedData?.length === 0) ? <>
          <div className="flex flex-col justify-center items-center h-[60vh]">
    <h1 className="text-2xl font-semibold mb-2">No Data Found</h1>
    <p className="text-[#4E7690] mb-14 font-normal text-md">
      Add some data to see it here
    </p>
  </div>
        </> : <>
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
              <button onClick={deleteSelectedRows} className="bg-[#F44336] py-3 pl-3 pr-4  flex justify-center items-center text-sm font-medium gap-2 rounded-lg text-[#FDEBEA]">
                <AiOutlineDelete className=" w-5 h-5" />
                Empty Trash
              </button>
            </div>
          </div>
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-[#EAECF0] ">
              <thead class="bg-[#FCFCFD] ">
                <tr>
                  <th scope="col" class="py-3 px-4 pe-0">
                  <div class="flex items-center  w-5 h-5 hover:cursor-pointer" onClick={clearSelection} >
                      <LuMinusSquare className="text-[#4E7690] w-5 h-5" />
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
                    <div className="flex gap-2 hover:cursor-pointer" >
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
              class=" custom-checkbox"
              checked={checkedRows[index]}
              onChange={() => handleNonObjectCheckboxChange(index)}
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
                          class="custom-checkbox"
                          // checked={selectedRows.includes(row._id)}
                          checked={checkedRows[index]}
                          onChange={() => handleObjectCheckboxChange(index, row?._id)}
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
                    {new Date(row?.active).toLocaleString(
                                  "en-IN",
                                  {
                                    timeZone: "Asia/Kolkata",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                    </td>
                   
                    <td class="px-4 py-4 whitespace-nowrap text-center text-sm font-medium bg-[#DCE4E9]">
                      <button
                        type="button"
                        class="inline-flex items-center  text-sm font-semibold rounded-lg border "
                      >
                        <RiDeleteBin4Fill className=" w-4 h-4 text-[#4E7690]" />
                      </button>
                    </td>
                  </tr>)
                )}
              </tbody>
            </table>
          </div>
          <div class="py-2 px-4 flex items-center justify-between">
            <div className=" text-sm text-[#4E7690] font-medium">
              <h1>
                {indexOfFirstRow + 1} - {totalRows < indexOfLastRow ? totalRows : indexOfLastRow} of {totalRows} items
              </h1>
            </div>
            <nav class="flex items-center space-x-1 gap-2">
              <button
                type="button"
                class="px-3 py-2 rounded-lg border border-gray-200 shadow-sm text-[#71839B] font-medium text-sm hover:bg-[#4E76904D] hover:text-[#4E7690]"
                onClick={() => { if(currentPage !== 1){handlePageChange(currentPage - 1)}}}
              >
                <span aria-hidden="true">Previous</span>
                <span class="sr-only">Previous</span>
              </button>

              <button
                type="button"
                class="px-3 py-2 border border-gray-200 shadow-sm text-[#71839B] font-medium  text-sm rounded-lg hover:bg-[#4E76904D] hover:text-[#4E7690] "
                onClick={() => {if(currentPage!== totalPages){handlePageChange(currentPage + 1)}}}
              >
                <span aria-hidden="true">Next</span>
              </button>
            </nav>
          </div>
        </div>
        </>}
      </div>
    </div>
  </div>
  )
 
}

export default AdminDelete;
