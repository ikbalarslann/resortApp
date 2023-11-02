import React from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { useDispatch } from "react-redux";
import { setProperties } from "../slices/searchSlice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPropertyData = async (location, date) => {
    try {
      const response = await fetch("/api/properties"); // Ensure the correct API URL
      if (response.ok) {
        const data = await response.json();
        const filteredProperties = data.filter(
          (element) => element.location.toLowerCase() === location.toLowerCase()
        );

        filteredProperties.map((property) => {
          property.availability = property.availability.filter((element) => {
            element.date = format(new Date(element.date), "yyyy-MM-dd");
            return element.date === date;
          });
        });

        dispatch(setProperties(filteredProperties));
        navigate("/properties"); // Navigate to the desired page
      } else {
        console.error(
          "Failed to fetch property data. Status: " + response.status
        );
      }
    } catch (error) {
      console.error("Error while fetching property data:", error);
    }
  };

  const handleSearch = ({ location, date }) => {
    fetchPropertyData(location, date);
  };

  return (
    <>
      <Hero />
      <SearchBar onSearch={handleSearch} />
    </>
  );
};

export default Home;
