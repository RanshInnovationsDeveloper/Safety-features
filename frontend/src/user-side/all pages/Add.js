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
import pageContext from "./notes/pageContext";
import axios from 'axios';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useContext, useRef, useState, useEffect } from 'react'

// let dest
// let center = { lat: 29.6857, lng: 76.9905 }
function App() {
  const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI',
      libraries: ['places'],
  })
  const { places, addPlace, deletePlace, editPlace, getPlaces,getCoordinates, userCoordinates } = useContext(pageContext);
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [center, setCenter] = useState({ lat: 29.6857, lng: 76.9905 });
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [expiration, setExpiration] = useState('-1');
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [policeStations, setPoliceStations] = useState([]);
  const [marking, setMarking] = useState(null);
  const [placeName, setPlaceName] = useState('');

  const destiantionRef = useRef()

  
  useEffect(() => {
    getPlaces();
    // comment this after login and signup is made
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMzYwMjM2MmFiYmE3YWY4ZTA1OTNmIn0sImlhdCI6MTcxMjU0NTgyN30.wkRD4c2f2BLt58YG74XycTGIYS5nR6c777pRW9K8g3g");
    getCoordinates();
  }, []);

  useEffect(() => {
    if (userCoordinates && userCoordinates.coordinates && userCoordinates.coordinates.length > 0) {
        console.log(userCoordinates);
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
  
      // Calculate the distance between the clicked location and the center => assigned place
      const distance = calculateDistance(center.lat, center.lng, clickedLat, clickedLng);
  
      // Proceed only if the distance is within the maximum allowed radius
      if (distance <= maxDistance) {
          console.log({
              lat: clickedLat,
              lng: clickedLng,
          });
          setMarking({
              lat: clickedLat,
              lng: clickedLng,
          });
          try {
              const response = await axios.get(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedLat},${clickedLng}&key=YOUR_API_KEY`
              );
              const place = response.data.results[0].formatted_address;
              setPlaceName(place);
              setAddress(place);
              setCoordinates(`${clickedLat}, ${clickedLng}`);
          } catch (error) {
              console.error('Error fetching place name:', error);
          }
      } else {
          console.log('Location is outside the allowed radius.');
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

  const handleAddPlace = async () => {
      try {
          // Convert coordinates string to array
          const coordArray = coordinates.split(',').map(coord => parseFloat(coord.trim()));

          await addPlace(name, address, coordArray, parseInt(expiration));
          // Clear form fields after successful addition
          setName('');
          setAddress('');
          setCoordinates('');
          setExpiration('-1');
      } catch (error) {
          console.error('Error adding place:', error.message);
      }
  };

  const handleClearMarkers = () => {
      setName('');
          setAddress('');
          setCoordinates('');
          setExpiration('-1');
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
      setDuration('')
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

                  <Marker position={center} />
                  {policeStations.map((station, index) => (
                      <Marker
                          key={index}
                          position={{ lat: station.geometry.location.lat, lng: station.geometry.location.lng }}
                          icon={{
                              url: 'police-badge.png', // URL of the marker icon
                              scaledSize: new window.google.maps.Size(32, 32) // Adjust the size as needed
                          }}
                          title={station.name}
                      />
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
                  <Marker position={marking} />
                  {directionsResponse && (
                      <DirectionsRenderer directions={directionsResponse} />
                  )}
              </GoogleMap>
          </Box>
          <Box
              p={4}
              borderRadius='lg'
              m={4}
              bgColor='white'
              shadow='base'
              minW='container.md'
              zIndex='1'
          >
              <HStack spacing={2} justifyContent='space-between'>
                  <Box flexGrow={1}>
                  </Box>

                  <ButtonGroup>
                      <IconButton
                          aria-label='center back'
                          icon={<FaTimes />}
                          onClick={clearRoute}
                      />
                  </ButtonGroup>
              </HStack>
              <HStack spacing={4} mt={4} justifyContent='space-between'>
                  <Text>Distance: {distance} </Text>
                  <Text>Duration: {duration} </Text>
                  <Text>{placeName} </Text>
                  <IconButton
                      aria-label='center back'
                      icon={<FaTimes />}
                      isRound
                      onClick={() => {
                          handleClearMarkers();
                      }}
                  />
                  <IconButton
                      aria-label='center back'
                      icon={<FaLocationArrow />}
                      isRound
                      onClick={() => {
                          map.panTo(center)
                          map.setZoom(15)
                      }}
                  />
                  <IconButton
                      aria-label='center back'
                      icon={<FaSave />}
                      isRound
                      onClick={() => {handleAddPlace()}}
                  />
              </HStack>
          </Box>
      </Flex>
  )
}

export default App
