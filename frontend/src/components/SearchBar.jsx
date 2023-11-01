import React, { useState } from "react";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(""); // Add a state for the date

  const handleSearch = () => {
    onSearch({ location, date }); // Pass both location and date to the onSearch function
  };

  return (
    <Form>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="date"
          placeholder="Search by date" // You can use a date input field
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
