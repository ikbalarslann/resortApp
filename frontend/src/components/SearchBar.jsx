import React, { useState } from "react";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(location);
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
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
