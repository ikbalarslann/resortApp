import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useDispatch } from "react-redux";
import { setDate } from "../slices/searchbars/dateSlice";
import { setLocation } from "../slices/searchbars/locationSlice";
import { setProperties } from "../slices/properties/propertiesSlice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Reduxlocation = useSelector((state) => state.location);
  const Reduxdate = useSelector((state) => state.date);
  const Reduxproperties = useSelector((state) => state.properties);

  const fetchPropertyData = async (location, date) => {
    dispatch(setLocation(location.toLowerCase()));
    dispatch(setDate(date));

    try {
      const response = await fetch("/api/properties");
      if (response.ok) {
        const data = await response.json();

        const filteredPropertiesbydate = await data.map((property) => {
          const modifiedProperty = {
            ...property,
            availability: property.availability.filter((element) => {
              element.date = format(new Date(element.date), "yyyy-MM-dd");
              return element.date === Reduxdate.date;
            }),
          };
          return modifiedProperty;
        });

        const filteredPropertiesbyLocation =
          await filteredPropertiesbydate.filter((property) => {
            return property.location.toLowerCase() === Reduxlocation.location;
          });

        dispatch(setProperties(filteredPropertiesbyLocation));
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
  useEffect(() => {
    if (Reduxproperties.properties.length === 0) return;
    navigate("/user/properties");
  }, [Reduxproperties.properties]);

  return (
    <>
      <h1>Home Page</h1>
      <SearchBar onSearch={handleSearch} />
    </>
  );
};

export default Home;
