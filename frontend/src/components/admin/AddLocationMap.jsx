import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes, FaSave } from 'react-icons/fa'
  import pageContext from "../../notes/pageContext";
  import axios from 'axios';
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useContext, useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
  
  function AddLocationMap({style,setCity,setPincode,setState,setCountry,setCoordinates,setName,setAddress}) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI",
        libraries: ['places'],
    })
    const { places, addPlace, deletePlace, editPlace, getPlaces,getCoordinates, userCoordinates } = useContext(pageContext);
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [center, setCenter] = useState({ lat: 0.0, lng: 0.0 });
    const [clicked, setClicked] = useState(null);
    // const [name, setName] = useState('');
    // const [address, setAddress] = useState('');
    // const [coordinates, setCoordinates] = useState('');
    // const [expiration, setExpiration] = useState('-1');
    const [distance, setDistance] = useState('')
    // const [duration, setDuration] = useState('')
    const [policeStations, setPoliceStations] = useState([]);
    const [marking, setMarking] = useState(null);
    const [placeName, setPlaceName] = useState('');
  
    const destiantionRef = useRef()
  
    
    useEffect(() => {
      getPlaces();
      getCoordinates();
    }, []);
  
    useEffect(() => {
      if (userCoordinates && userCoordinates.coordinates && userCoordinates.coordinates.length > 0) {
          console.log(userCoordinates);
          console.log( userCoordinates.userId.userid);
          const [lat, lng] = userCoordinates.coordinates[0]; // Extract lat and lng from the array
          if (lat && lng) {
              setCenter({ lat, lng });
          }
      }
  }, [userCoordinates]);
  
  // We can give access of location by either area defined in google maps/ or by defining radius and location as centre point or combination of both; it should be defined after getting inputs by police officials.
    const maxDistance = 7;
  
    const handleClick = async (e) => {
        // Get latitude and longitude of the clicked location
        const clickedLat = e.latLng.lat();
        const clickedLng = e.latLng.lng();
        setClicked({
            lat: clickedLat,
            lng: clickedLng,
        })
        // Calculate the distance between the clicked location and the center => assigned place
        const distance = calculateDistance(center.lat, center.lng, clickedLat, clickedLng);
    
        // Proceed only if the distance is within the maximum allowed radius
        if (distance <= maxDistance) {
            setMarking({
                lat: clickedLat,
                lng: clickedLng,
            });
            const clickedLoc={lat:clickedLat,lng:clickedLng}
            console.log(clickedLoc)
            setCoordinates(clickedLoc);

            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedLat},${clickedLng}&key=AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI`
                );
              //   n-3
                const place = response.data.results[0].address_components;
                const cityComponent=place.find((component) =>
                  component.types.includes("locality")
                );

                const stateComponent=place.find((component) =>
                    component.types.includes("administrative_area_level_1")
                    );

                const pincodeComponent = place.find((component) =>
                        component.types.includes("postal_code")
                      );

                const countryComponent = place.find((component) =>
                        component.types.includes("country")
                      );

                const addressComponent = place.find((component) =>
                        component.types.includes("street_address")
                      );

                      const placeNameComponent = place.find((component) =>
                        component.types.includes("establishment")
                      );
              //   console.log(cityComponent.long_name)
                setCity(cityComponent.long_name);
                setState(stateComponent.long_name);
                setPincode(pincodeComponent.long_name);
                setCountry(countryComponent.long_name);
                setName(placeNameComponent.long_name);
                console.log(clickedLoc)
                if (addressComponent) {
                    setAddress(addressComponent.long_name);
                  } else {
                    toast.error('Street address not found');
                }
                // setAddress(cityComponent.long_name);

            } catch (error) {
                console.error('Error fetching place name:', error);
            }
        } else {
            toast.error('Location is outside the allowed radius.');
            // Optionally, you can provide feedback to the user that the location is outside the allowed radius.
        }
    };
    
    // Function to calculate distance between two points using Haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    }
    
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
  
    // const handleAddPlace = async () => {
    //     try {
    //         // Convert coordinates string to array
    //         const coordArray = coordinates.split(',').map(coord => parseFloat(coord.trim()));
  
    //         console.log(name,address,coordArray,userCoordinates.userId.userid);
    //         // Clear form fields after successful addition
    //         setName('');
    //         setAddress('');
    //         setCoordinates('');
    //         // setExpiration('-1');
    //       console.log("place added")
    //     } catch (error) {
    //         console.error('Error adding place:', error.message);
    //     }
    // };
  
    const handleClearMarkers = () => {
        setName('');
            setAddress('');
            setCoordinates('');
            // setExpiration('-1');
        setMarking()
    };
  
    const getNearbyPoliceStations = async () => {
        if (!center) return;
  
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=10000&type=police&key=AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI`
        );
  
        setPoliceStations(response.data.results);
    };
  
    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        // setDuration('')
        destiantionRef.current.value = ''
    }
  
  
    useEffect(() => {
        getNearbyPoliceStations();
    }, [center]);
  
    if (!isLoaded) {
        return <SkeletonText />
    }
  
  
    return (
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
            style={style}
        >
            <Box position='absolute' left={0} top={0} h='90%' w='100%'>
                {/* Google Map Box */}
                <GoogleMap
                    center={center}
                    zoom={15}
                    onClick={handleClick}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    {policeStations.map((station, index) => (
                        <>
                        <Marker position={center} />
                        <Marker position={marking} />
                        <Marker
                            key={index}
                            position={{ lat: station.geometry.location.lat, lng: station.geometry.location.lng }}
                            icon={{
                                url: 'police-badge.png', // URL of the marker icon
                                scaledSize: new window.google.maps.Size(32, 32) // Adjust the size as needed
                            }}
                            title={station.name}
                        />
                        </>
                    ))}
                    {places.map((station, index) => (
                        <Marker
                            key={index}
                            position={{ lat: station.coordinates[0], lng: station.coordinates[1] }}
                            icon={{
                                url: 'police-badge.png', // URL of the marker icon
                                scaledSize: new window.google.maps.Size(32, 32) // Adjust the size as needed
                            }}
                            title={station.address}
                        />
                    ))}
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
        </Flex>
    )
  }
  
  export default AddLocationMap
  