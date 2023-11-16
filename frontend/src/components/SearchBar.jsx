import React, { useState, useEffect } from "react";
import "./scss/searchBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../slices/properties/propertiesSlice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { setLocation } from "../slices/searchbars/locationSlice";
import { setDate } from "../slices/searchbars/dateSlice";
import { setSProperties } from "../slices/properties/SpropertiesSlice";

const SearchBar = () => {
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterproperties, setFilterProperties] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { date } = useSelector((state) => state.date);
  const { location } = useSelector((state) => state.location);
  const { properties } = useSelector((state) => state.properties);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    const value = e.target.value.toLowerCase();
    dispatch(setLocation(value));
    setShowSuggestions(value.length > 0);
  };

  const handleLocationSelect = (selectedLocation) => {
    dispatch(setLocation(selectedLocation));
    setShowSuggestions(false);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    dispatch(setDate(value));
  };

  const handleSearch = async () => {
    setSearchTriggered(true);
  };

  useEffect(() => {
    if (searchTriggered) {
      const fetchData = async () => {
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
              .filter(
                (property) => property.location.toLowerCase() === location
              );

            setFilterProperties(filteredProperties);
            dispatch(setSProperties(filteredProperties));
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

      fetchData();
      setSearchTriggered(false);
    }
  }, [searchTriggered, location, date, dispatch]);

  useEffect(() => {
    dispatch(setProperties(filterproperties));
  }, [filterproperties, dispatch]);

  useEffect(() => {
    if (properties.length > 0) {
      navigate("/user/properties");
    }
  }, [properties, navigate]);

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

  return (
    <div className="searchBar-cover">
      <div className="searchBar">
        <div className="searchbar__input-locationsuggestion">
          <input
            className="searchBar__input"
            type="text"
            id="location"
            placeholder="Search by location"
            value={location || ""}
            onChange={handleLocationChange}
            autoComplete="off"
          />
          {showSuggestions && (
            <div className="searchBar__input__suggestions">
              {suggestedLocations
                .filter((suggestedLocation) =>
                  suggestedLocation.toLowerCase().includes(location)
                )
                .map((suggestedLocation) => (
                  <div
                    className="searchBar__input__suggestions-suggestion"
                    key={suggestedLocation}
                    onClick={() => handleLocationSelect(suggestedLocation)}
                  >
                    {suggestedLocation}
                  </div>
                ))}
            </div>
          )}
        </div>

        <input
          className="searchBar__input"
          type="date"
          id="date"
          placeholder="Search by date"
          value={date || ""}
          onChange={handleDateChange}
        />

        <button className="searchBar__button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
