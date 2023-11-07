import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useDispatch } from "react-redux";
import { setProperties } from "../slices/properties/propertiesSlice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const Home = () => {
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [filterproperties, setFilterProperties] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Reduxproperties = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(setProperties(filterproperties));
  }, [filterproperties, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/locations");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const locations = data.map((location) => location.location);

        setSuggestedLocations(locations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchPropertyData = async (location, date) => {
    try {
      const response = await fetch("/api/properties");
      if (response.ok) {
        const data = await response.json();

        const filteredProperties = await data
          .map((property) => ({
            ...property,
            availability: property.availability
              .map((element) => ({
                ...element,
                date: format(new Date(element.date), "yyyy-MM-dd"),
              }))
              .filter((element) => element.date === date),
          }))
          .filter((property) => property.location.toLowerCase() === location);

        setFilterProperties(filteredProperties);
      } else {
        console.error(
          "Failed to fetch property data. Status: " + response.status
        );
      }
    } catch (error) {
      console.error("Error while fetching property data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (Reduxproperties.properties.length > 0) {
      navigate("/user/properties");
    }
  }, [Reduxproperties.properties, navigate]);

  const handleSearch = ({ location, date }) => {
    fetchPropertyData(location, date);
  };

  return (
    <>
      <h1>Home Page</h1>
      <SearchBar
        onSearch={handleSearch}
        suggestedLocations={suggestedLocations}
      />
    </>
  );
};

export default Home;
