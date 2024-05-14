import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FaLocationDot, FaLocationArrow, FaTimes } from "react-icons/fa";
import axios from "axios";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBVzhfAB_XLqaayJkOSuThEdaK4vifdxAI",
    libraries: ["places"],
  });

  const [center, setCenter] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [policeStations, setPoliceStations] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [zoom, setZoom] = useState(15);
  const [arrowMarkers, setArrowMarkers] = useState([]);
  const [directionsPanel, setDirectionsPanel] = useState("");

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

  const darkmode = [
    // Your dark mode styling
  ];

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
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

  useEffect(() => {
    getNearbySafety();
  }, [center]);

  const handleMarkerClick = async (event) => {
    const { latLng } = event;
    const destination = { lat: latLng.lat(), lng: latLng.lng() };

    if (!center || !center.lat || !center.lng) {
      console.error("Invalid center");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: center,
      destination: destination,
      travelMode: window.google.maps.TravelMode.WALKING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    calculateRouteArrowMarkers(results);
  };

  const calculateBearing = (p1, p2) => {
    if (!p1 || !p2 || !p1.lat || !p1.lng || !p2.lat || !p2.lng) {
      console.error("Invalid points");
      return 0;
    }

    const lat1 = (Math.PI / 180) * p1.lat;
    const lng1 = (Math.PI / 180) * p1.lng;
    const lat2 = (Math.PI / 180) * p2.lat;
    const lng2 = (Math.PI / 180) * p2.lng;

    const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return bearing;
  };

  const getArrowIcon = (rotation) => {
    return {
      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      fillColor: "blue",
      fillOpacity: 1,
      strokeColor: "blue",
      strokeWeight: 1,
      rotation: rotation,
      scale: 6,
    };
  };

  const calculateRouteArrowMarkers = (directionsResponse) => {
    if (!directionsResponse) return;

    const route = directionsResponse.routes[0];
    const path = route.overview_path;
    const step = 100; // Adjust the step as needed

    let arrowMarkers = [];

    for (let i = 0; i < path.length - 1; i += step) {
      const bearing = calculateBearing(path[i], path[i + step]);
      arrowMarkers.push({
        position: path[i],
        icon: getArrowIcon(bearing),
      });
    }

    setArrowMarkers(arrowMarkers);
  };

  const updateDirections = () => {
    if (!map || !directionsResponse) return;
    const route = directionsResponse.routes[0];
    const leg = route.legs[0];

    let stepIndex = -1;
    let nextSegment = -1;
    let steps = [];

    for (let i = 0; i < leg.steps.length; i++) {
      if (leg.steps[i].distance.value > 50) {
        nextSegment = leg.steps[i].path;
        stepIndex = i;
        steps = leg.steps;
        break;
      }
    }

    if (stepIndex === -1) {
      stepIndex = 0;
      nextSegment = leg.steps[0].path;
      steps = leg.steps;
    }

    const step = steps[stepIndex];
    const distanceToNextSegment = window.google.maps.geometry.spherical.computeDistanceBetween(
      center,
      nextSegment[0]
    );

    let instruction = step.instructions.replace(/<[^>]+>/g, "");

    setDirectionsPanel(
      `<strong>${instruction}</strong> in ${Math.round(
        distanceToNextSegment
      )} meters`
    );
  };

  useEffect(() => {
    const interval = setInterval(updateDirections, 1000);
    return () => clearInterval(interval);
  }, [directionsResponse, map]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {isLoaded && (
        <GoogleMap
          center={center}
          zoom={zoom}
          mapContainerStyle={{ height: "100%", width: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: darkmode,
          }}
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}

          {arrowMarkers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={marker.icon} />
          ))}

          <Marker position={center} onClick={handleMarkerClick} />
          {policeStations.map((station, index) => (
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
          ))}
          {hospital.map((station, index) => (
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
          ))}
        </GoogleMap>
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "100%",
          backgroundColor: "white",
          zIndex: 1000,
          overflowY: "auto",
          padding: "10px",
        }}
        dangerouslySetInnerHTML={{ __html: directionsPanel }}
      ></div>
    </div>
  );
}

export default App;
