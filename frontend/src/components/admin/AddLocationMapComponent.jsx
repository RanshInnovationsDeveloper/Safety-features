import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { toast } from "react-toastify";
import axios from "axios";

const Marker = ({ markerPosition }) => {
  return (
    <div
      style={{
        position: "fixed",
        transform: "translate(-50%, -100%)",
        transition: "transform 0.5s ease",
      }}
    >
      📍
    </div>
  );
};

const AddLocationMapComponent = ({
  position,
  setPosition,
  style,
  city,
  setCity,
}) => {
  const defaultPosition = { lat: 40.7128, lng: -74.006 }; // Default to New York
  const [markerPosition, setMarkerPosition] = useState({
    lat: position?.lat || defaultPosition.lat,
    lng: position?.lng || defaultPosition.lng,
  });

  const onClick = async ({ lat, lng }) => {
    setPosition({ lat, lng });
    setMarkerPosition({ lat, lng });

    // Reverse geocoding to get city name
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_API_KEY}`
    );
    const addressComponents = response.data.results[0].address_components;
    const cityComponent = addressComponents.find((component) =>
      component.types.includes("locality")
    );
    setCity(cityComponent.long_name);

    toast.success(`City: ${cityComponent.long_name}`);
  };

  return (
    <div style={style}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        center={position}
        defaultZoom={10}
        onClick={onClick}
      >
        <Marker lat={markerPosition.lat} lng={markerPosition.lng} />
      </GoogleMapReact>
      <p>Selected city: {city}</p>
    </div>
  );
};

export default AddLocationMapComponent;
