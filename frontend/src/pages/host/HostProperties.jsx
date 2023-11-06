import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MyCard from "../../components/cards/MyCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HostProperties = () => {
  const [properties, setProperties] = useState([]);

  const { hostInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch properties data here and update state
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <>
      <Link to="/host/create">
        <Button variant="primary">Create Property</Button>
      </Link>

      <Container>
        <Row>
          {properties
            .filter((property) => property.hostId === hostInfo?._id)
            .map((property) => (
              <Col key={property._id} md={4}>
                <MyCard property={property} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default HostProperties;
