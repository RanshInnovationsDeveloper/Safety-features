import {
    Box,
    Flex,
    HStack,
    IconButton,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'
  import axios from 'axios';
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState, useEffect } from 'react'
  
  let center = { lat: 29.6857, lng: 76.9905 }
  
  function App() {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI',
      libraries: ['places'],
    })
  
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [policeStations, setPoliceStations] = useState([]);
    let destination1 = { lat: 30.3398, lng: 76.3869 }; // Los Angles30.7333° N, 76.7794° 
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          center = { lat: position.coords.latitude, lng: position.coords.longitude };
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }, []);
  
    const getNearbyPoliceStations = async () => {
      if (!center) return;
  
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=5000&type=police&key=AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI`
      );
      const response1 = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=5000&type=hospital&key=AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI`
      );
      const combinedResults = [
        ...response.data.results,
        ...response1.data.results
      ];
      console.log(combinedResults);
      setPoliceStations(combinedResults);
    };
  
  
    useEffect(() => {
      getNearbyPoliceStations();
    }, [center]);
  
    if (!isLoaded) {
      return <SkeletonText />
    }
  
    const handleMarkerClick = async (event) => {
      const { latLng } = event;
      destination1 = { lat: latLng.lat(), lng: latLng.lng() };
      console.log(destination1);
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: center,
        destination: destination1,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.WALKING,
      })
      console.log(results)
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    };
  
  
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
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
  
            <Marker position={center} onClick={handleMarkerClick} />
            {policeStations.map((station, index) => (
            <Marker
              key={index}
              position={{ lat: station.geometry.location.lat, lng: station.geometry.location.lng }}
              icon={{
                url: 'police-badge.png', // URL of the marker icon
                scaledSize: new window.google.maps.Size(32, 32) // Adjust the size as needed
              }}
              title={station.name}
              onClick={handleMarkerClick}
            />
          ))}
  
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
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            />
          </HStack>
        </Box>
      </Flex>
    )
  }
  
  export default App
  