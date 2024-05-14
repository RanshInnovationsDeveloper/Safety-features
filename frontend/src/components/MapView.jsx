import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ apiKey }) => {
  const [directions, setDirections] = useState(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  const renderDirections = () => {
    if (directions) {
      return (
        <div>
          {directions.routes.map((route, index) => {
            return (
              <div key={index}>
                <h3>Route {index + 1}</h3>
                <ul>
                  {route.legs.map((leg, index) => (
                    <li key={index}>
                      {leg.start_address} to {leg.end_address}: {leg.distance.text}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <input
        type="text"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        placeholder="Enter starting point"
      />
      <br />
      <input
        type="text"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        placeholder="Enter destination point"
      />
      <br />
      <button onClick={handleRoute}>Get Route</button>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }} 
        defaultZoom={12}
      >
        
      </GoogleMapReact>
      {renderDirections()}
    </div>
  );
};

export default GoogleMap;
