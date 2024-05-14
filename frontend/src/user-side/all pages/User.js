import {
  Box,
  Flex,
  HStack,
  VStack,
  IconButton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import axios from "axios";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import './styles/User.css';
import { IoCloseCircleSharp, IoSearchCircleSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI",
    libraries: ["places"],
  });

  const [center, setCenter] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [policeStations, setPoliceStations] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [zoom, setZoom] = useState(15);
  const [showModal, setModal] = useState(false);
  const [clicked , setClicked] = useState(false);
  const [optionClicked, setOptionClicked] = useState(false);
  const [left, setLeft] = useState(false);
  const [destination2, setDestination2] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const category = [ 
    'Metro Station', 'Airports', 'Government Buildings', 'Heritage Monuments', 'Army Area', 'Para Police', 'Railway Police Force', 'Quarters'
  ];

  const toggleSelection = (id) => {
    if(selectedOptions.includes(id)){
      setSelectedOptions(selectedOptions.filter(item => item !== id));
    }
    else
    {
      setSelectedOptions([...selectedOptions, id]);
    }
  }

  const destiantionRef = useRef()

  const darkmode = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  let destination1 = { lat: 30.3398, lng: 76.3869 }; // Los Angles30.7333° N, 76.7794°
  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);


  const handlemenuclick = async (station) => {
    setDestination2({ lat: station.geometry.location.lat, lng: station.geometry.location.lng });
    const directionsService2 = new window.google.maps.DirectionsService();
    const results = await directionsService2.route({
      origin: center,
      destination: { lat: station.geometry.location.lat, lng: station.geometry.location.lng },
      travelMode: window.google.maps.TravelMode.WALKING,
    });
    console.log(results);
    clearRoute();
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };
  const getNearbySafety = async () => {
    if (!center) return;

    const response = await axios.get(
      ` https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=5000&type=police&key=AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI`
    );
    const response1 = await axios.get(
      ` https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=5000&type=hospital&key=AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI`
    );

    setPoliceStations(response.data.results);
    setHospital(response1.data.results);
  };

  const handleButtonClick = async (props) => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=5000&type=${props}&key=AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI`
    );
    setClicked(res.data.results)
  };

  useEffect(() => {
    getNearbySafety();
  }, [center]);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const handleMarkerClick = async (event) => {
    const { latLng } = event;
    destination1 = { lat: latLng.lat(), lng: latLng.lng() };
    console.log(destination1);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: center,
      destination: destination1,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    });
    console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setModal(true); // Open modal when marker is clicked
  };


  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="72.5vh"
      w="100%"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: darkmode,
          }}
          onLoad={(map) => setMap(map)}
        >
          {policeStations.map((station, index) => (
            <>
              <Marker position={center} onClick={handleMarkerClick} />
              <Marker
                key={index}
                position={{
                  lat: station.geometry.location.lat,
                  lng: station.geometry.location.lng,
                }}
                icon={{
                  url: "police-badge.png", // URL of the marker icon
                  scaledSize: new window.google.maps.Size(24, 24), // Adjust the size as needed
                }}
                title={station.name}
                onClick={handleMarkerClick}
              />
            </>
          ))}
          {hospital.map((station, index) => (
            <>
              <Marker
                key={index}
                position={{
                  lat: station.geometry.location.lat,
                  lng: station.geometry.location.lng,
                }}
                icon={{
                  url: "hospital.png", // URL of the marker icon
                  scaledSize: new window.google.maps.Size(24, 24), // Adjust the size as needed
                }}
                title={station.name}
                onClick={handleMarkerClick}
              />
            </>
          ))}

          {directionsResponse && (
            <>
              <DirectionsRenderer
                directions={directionsResponse}
                options={{
                  suppressMarkers: true, // Suppress default markers
                  polylineOptions: {
                    strokeColor: "blue", // Color of the route line
                  },
                }}
                panel={document.getElementById("directionsPanel")} // HTML element to display turn-by-turn instructions
              />
              <div id="directionsPanel" className="h-full overflow-y-auto bg-white p-4 border border-gray-300"></div>
            </>
          )}

        </GoogleMap>
      </Box>
      <div className="flex flex-col  z-10 w-full ">
      <div className="flex flex-row w-full  justify-between px-[2rem] z-10  items-center mt-4  ">
        <div className="flex flex-row justify-center items-center  gap-11  z-10 ">
          <div className="flex flex-col justify-center items-center">
          <Box
            p={4}
            m={4}
            bgColor="white"
            shadow="base"
            minW="container.md"
            zIndex="1"
            className="rounded-full shadow-2xl justify-start "
          >
            <HStack spacing={4} justifyContent="space-between">
              <div className="rounded-full flex flex-row justify-center items-center px-4 gap-2 bg-black bg-opacity-5 m-2 ">
                <FaLocationDot />
                <Autocomplete>
                  <input
                    type="text"
                    className="focus:outline-none  w-[20rem] h-[3.4rem] rounded-full bg-transparent  placeholder:text-[#1F2521]"
                    placeholder="Search by police station, name, etc.."
                    ref={destiantionRef}

                  />
                </Autocomplete>

              </div>

            </HStack>
         
          </Box>
    
          </div>
          

          
          <div className="flex flex-col justify-center items-center  ">
          <Box
            p={4}
            m={4}
            shadow="base"
            minW="container.md"
            zIndex="1"
            className=" shadow-2xl "
          >
            <HStack spacing={4} justifyContent="space-between">
              <div className=" flex flex-row justify-center items-center gap-2">
                <button onClick={()=> handleButtonClick('police')} className="bg-[#4E7690] flex  justify-center items-center gap-2 py-3 px-4 rounded-[0.75rem] text-base  text-white">
                  <img src="police-button.png" alt="" />
                  Police Station
                </button>
                <button onClick={()=> handleButtonClick('pump')} className="bg-[#4E7690] flex  justify-center items-center gap-2 py-3 px-4 rounded-[0.75rem] text-base  text-white">
                  <img src="petrol.png" alt="" />
                  Petrol
                </button>
                <button onClick={()=> handleButtonClick('hospital')} className="bg-[#4E7690] flex  justify-center items-center gap-2 py-3 px-4 rounded-[0.75rem] text-base  text-white">
                  <img src="medical.png" alt="" />
                  Hospital / Clinics
                </button>
                <button
                  onClick={() => {setOptionClicked(!optionClicked)
                    // handleButtonClick('hospital')
                  }}
                  className="bg-[#4E7690] flex  justify-center items-center gap-2 py-3 px-4 rounded-[0.75rem] text-base  text-white"
                >
                  ... More
                </button>
                </div>
                <div className={`bg-white text-black font-semibold flex  justify-center items-center gap-2 py-3 px-4 rounded-[0.75rem] text-base   ${distance ? "visible" : "hidden"}`}>
                 Distance: {distance} Duration: {duration}
                </div>
              </HStack>
            </Box>
          </div>

        </div>

        <Box
          p={4}
          m={4}
          bgColor="white"
          shadow="base"
          minW="container.md"
          zIndex="1"
          className="rounded-lg"
        >
          <HStack spacing={4} justifyContent="space-between">
            <button className="px-2 py-2 " onClick={() => setZoom(zoom + 1.5)}>
              <FaPlus />
            </button>
            <button className="px-2 py-2 " onClick={() => setZoom(zoom - 1.5)}>
              <FaMinus />
            </button>
          </HStack>
        </Box>
      </div>
      <div className="relative  flex flex-row">
      <Box position='relative' className={`border-2  mx-8 mt-2 rounded-xl ${clicked? "visible animate-slide-right" : "hidden animate-slide-left"}   `} zIndex={10}  h='50vh' w='26%' bgColor='#EEEBE7' p={4} shadow='base'> 
          
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between w-full px-4 pt-2 pb-2 border-b items-center border-black">
         <div className="gap-3 flex items-center">
         <IoSearchCircleSharp className="w-[2.5rem] h-[2.5rem] text-[#979797]"/>
            <p className="text-lg font-semibold">{clicked.length} found</p>
         </div>
         <div className="bg-black rounded-full w-[2rem] h-[2rem]">
         <IoCloseCircleSharp className="w-[2rem] h-[2rem] text-[#D9D9D9] " onClick={() => {
          setLeft(true);
          setClicked(false);
         }}/>
         </div>
            

            </div>
            <Box  className="mx-8 mt-2 rounded-xl overflow-auto  scrollbar-hide  pr-[1.25rem] py-2 " zIndex={10}  h='40vh' w='100%' bgColor='#EEEBE7'  shadow='base'>
            <div className="overflow-auto h-full">
            <VStack align='start' spacing={4} className="overflow-auto">
              {clicked && clicked.map((station, index) => (
              <>
                <Box key={index} onClick={() => handlemenuclick(station)} cursor='pointer' className=" px-4 py-2" borderRadius='md'>
                  <Text fontSize='md' fontWeight='bold'>{station.name}</Text>
                  {/* <Text className="text-sm" >{distance}</Text> */}
                  <Text className="text-sm">{station.vicinity}</Text>
                </Box>
                </>
              ))}
            </VStack>
            </div>
            
            </Box>

          </div>
          </Box>
          <Box position='relative' className={`border-2  mx-12 mt-2 rounded-xl ${clicked? "" : "left-[30.2%]"} ${optionClicked? "visible animate-slide-left" : "hidden "}   `} zIndex={10}  h='50vh' w='32%' bgColor='white' p={4} shadow='base'> 
          
          <div className="flex flex-col justify-center items-center">
          <h1 className="text-left font-bold text-xl w-full px-4 py-2 mb-4" >Select Categories</h1>
            <Box  className="mx-8 mt-2 rounded-xl overflow-auto  px-[1.25rem] py-2 " zIndex={10}  h='30vh' w='100%' bgColor='white'  shadow='base'>
          
            <div className="overflow-auto   w-full flex flex-wrap gap-x-2 gap-y-2">
            {/* <HStack align='start' spacing={4} className="overflow-auto"> */}
              {optionClicked && category.map((station, index) => (
              <div className={`flex justify-center  rounded-xl w-fit h-fit hover:border hover:border-[#1F2521]  items-center px-3 py-3 ${selectedOptions.includes(station) ? "bg-[#1F2521] text-[#FFFFFF]" : "bg-[#DADADA] text-[#1F2521] "} `} onClick={() => toggleSelection(station)}>
                <p className=" text-base font-medium">{station}</p>
              </div>
    
              ))}
            {/* </HStack> */}
            </div>
            </Box>
            <div className="flex flex-row justify-end w-full px-4 pt-2 pb-2 items-center">
         <div className="gap-3 flex items-center">
         <button className="text-base border border-black text-black px-4 py-3 rounded-xl hover:scale-95  "
         onClick={() => {
          setOptionClicked(false);
          setSelectedOptions([]);
         }}  >
          Cancel
         </button>
       <button className="text-base bg-[#4E7690] text-white px-4 py-3 rounded-xl hover:scale-95" onClick={() => {setOptionClicked(false)}} >
        
        Apply {selectedOptions.length >0 && <>({selectedOptions.length})</>}
       </button>
         </div>
            

            </div>

          </div>
                      </Box>
      </div>
       
                           
      </div>
          </Flex>
  );
}

export default App;
