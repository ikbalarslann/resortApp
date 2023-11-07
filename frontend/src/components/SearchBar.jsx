import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";

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
    <Form>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={handleLocationChange}
        />
        {showSuggestions && (
          <ListGroup style={{ position: "absolute", width: "100%", zIndex: 1 }}>
            {suggestedLocations
              .filter((suggestedLocation) =>
                suggestedLocation.toLowerCase().includes(location)
              )
              .map((suggestedLocation) => (
                <ListGroup.Item
                  key={suggestedLocation}
                  action
                  onClick={() => handleLocationSelect(suggestedLocation)}
                >
                  {suggestedLocation}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </FormGroup>
      <FormGroup>
        <FormControl
          type="date"
          placeholder="Search by date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormGroup>
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
