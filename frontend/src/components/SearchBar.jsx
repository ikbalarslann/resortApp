import React, { useState } from "react";
import "./scss/searchBar.scss";

const SearchBar = ({ onSearch, suggestedLocations }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    onSearch({ location, date });
  };

  const handleLocationChange = (e) => {
    const value = e.target.value.toLowerCase();
    setLocation(value);
    setShowSuggestions(value.length > 0);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowSuggestions(false);
  };

  return (
    <div className="searchBar-cover">
      <div className="searchBar">
        <div className="searchbar__input-locationsuggestion">
          <input
            className="searchBar__input"
            type="text"
            id="location"
            placeholder="Search by location"
            value={location}
            onInput={handleLocationChange}
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
          value={date}
          onInput={(e) => setDate(e.target.value)}
        />

        <button className="searchBar__button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
