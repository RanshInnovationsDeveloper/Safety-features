import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope ,faLocationDot,faPlus,faBuildingShield,faGasPump,faTemperatureThreeQuarters,faMinus,faMicrophone} from '@fortawesome/free-solid-svg-icons'
import "../css/MapsOverhshadow.css"
const MapsOverhshadow = () => {
  return (
    <>
        <div className="container w-full m-0 p-0 cc mt-8 ml-24">
        {/* <div className="mt-48 ml-12 flex" > */}
          <input  placeholder="search by name,age,police station etc.."  className="ml-24 w-80 h-12 text-sm bg-gray-300 text-black"></input>
        <button className="bg-[#4E7690] mr-3 ml-12 p-3 text-sm rounded-lg text-white"><FontAwesomeIcon icon={faBuildingShield} /> Police Stations</button>
        <button className="bg mr-3 p-3 text-sm rounded-lg text-white"><FontAwesomeIcon icon={faGasPump} /> Petrol</button>
        <button className="bg mr-3 p-3 text-sm rounded-lg text-white"><FontAwesomeIcon icon={faPlus} /> Hospital / Clinics</button>
        <button className="bg mr-3 p-3 text-sm rounded-lg text-white">... More</button>     
        {/* </div> */}
      <button className=" bg2 p-3 ml-64 rounded-lg px-5 text-white"><FontAwesomeIcon icon={faTemperatureThreeQuarters} /> 26.</button>
        <button className="text-white p-3 ml-5 rounded-full bg2 h-12 mt-84 w-12"><FontAwesomeIcon icon={faPlus} /> </button>
        <button className="bg-white rounded-lg text-black ml-5 p-3"><FontAwesomeIcon icon={faPlus} className="mr-2" />   <FontAwesomeIcon icon={faMinus} /></button>  
      </div>
    </>
  );
};
export default MapsOverhshadow;