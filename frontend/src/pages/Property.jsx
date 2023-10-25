import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import { useSelector } from "react-redux";

const Property = () => {
  const [properties, setProperties] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch properties data here and update state
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <Container>
      <Row>
        {properties.map((property) => (
          <Col key={property._id} md={4}>
            <PropertyCard property={property} userId={userInfo._id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Property;
