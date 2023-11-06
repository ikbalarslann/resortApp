import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import the Link component

const Analytics = () => {
  const [properties, setProperties] = useState([]);

  const { hostInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch properties data here and update state
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <Container>
      <Link to="/all-properties">
        {" "}
        {/* Define the route for the "All" button */}
        <Button variant="primary">All</Button>{" "}
        {/* Added variant to style the button */}
      </Link>
      <Row>
        {properties
          .filter((property) => property.hostId === hostInfo?._id)
          .map((property) => (
            <Col key={property._id} md={4}>
              <Card className="m-2">
                <Link to={`/host/analytics/${property._id}`}>
                  <Card.Body>
                    <Card.Title>{property.title}</Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Analytics;
