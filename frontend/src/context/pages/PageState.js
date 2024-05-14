import pageContext from "./pageContext";
import { useState, useEffect } from "react";
import { useCallback } from "react";
const PageState = (props) => {
  const host = "http://localhost:5000";

  const placesInitial = [];
  const [places, setPlaces] = useState(placesInitial);
  const [userCoordinates, setUserCoordinates] = useState({}); // State to hold user coordinates

  

  const getCoordinates = async () => {
    try {
      const response = await fetch(`${host}/api/user/userCoordinates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const coordinates = await response.json();
      setUserCoordinates(coordinates); // Set user coordinates state
    } catch (error) {
      console.error(error.message);
    }
  };

  // useEffect(() => {
  //   getCoordinates(); // Call the function to fetch coordinates when the component mounts
  // }, []); // Empty dependency array means this effect runs only once, equivalent to componentDidMount

  // useEffect(() => {
  //   console.log(userCoordinates); // Log userCoordinates whenever it changes
  // }, [userCoordinates]); // This effect runs whenever userCoordinates changes

  const getPlaces = useCallback(async() => {
    try {
      const response = await fetch(`${host}/api/place/fetchallplaces`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         
        },
      });
      const json = await response.json();
      // console.log(json);
      setPlaces(json);
    } catch (error) {
      console.error(error.message);
    }
  },[places]);

  const addPlace = async (name, address, coordinates, expiration) => {
    try {
      const response = await fetch(`${host}/api/place/addplace`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, address, coordinates, expiration }),
      });
      const place = await response.json();
      setPlaces(places.concat(place));
    } catch (error) {
      console.error(error.message);
    }
  };

  const deletePlace = async (id) => {
    try {
      await fetch(`${host}/api/place/deleteplace/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const newPlaces = places.filter((place) => place._id !== id);
      setPlaces(newPlaces);
    } catch (error) {
      console.error(error.message);
    }
  };

  const editPlace = async (id, name, address, coordinates, expiration) => {
    try {
      await fetch(`${host}/api/place/updateplace/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, address, coordinates, expiration }),
      });
      const newPlaces = places.map((place) => {
        if (place._id === id) {
          return { ...place, name, address, coordinates, expiration };
        }
        return place;
      });
      setPlaces(newPlaces);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <pageContext.Provider value={{ places, addPlace, deletePlace, editPlace, getPlaces, getCoordinates, userCoordinates}}>
      {props.children}
    </pageContext.Provider>
  );
};

export default PageState;
