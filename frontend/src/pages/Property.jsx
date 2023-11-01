import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import { useSelector } from "react-redux";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    price: "",
    priceOption: "lower",
  });

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch properties data here and update state
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
      });
  }, []);

  useEffect(() => {
    // Filter properties based on location and price
    let filtered = properties;

    if (filters.location) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.price) {
      if (filters.priceOption === "lower") {
        filtered = filtered.filter(
          (property) => property.price <= parseFloat(filters.price)
        );
      } else if (filters.priceOption === "higher") {
        filtered = filtered.filter(
          (property) => property.price >= parseFloat(filters.price)
        );
      }
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Control
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Filter by Location"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Control
                type="number"
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                placeholder="Filter by Price"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Select
                name="priceOption"
                value={filters.priceOption}
                onChange={handleFilterChange}
              >
                <option value="lower">Lower Than</option>
                <option value="higher">Higher Than</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row>
        {filteredProperties.map((property) => (
          <Col key={property._id} md={4}>
            <PropertyCard property={property} userId={userInfo._id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Property;
