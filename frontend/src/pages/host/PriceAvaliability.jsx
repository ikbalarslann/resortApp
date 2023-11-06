import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MyCard from "../../components/cards/MyCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PriceAvaliability = () => {
  const [properties, setProperties] = useState([]);

  const { hostInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <Container>
      <Row>
        {properties
          .filter((property) => property.hostId === hostInfo?._id)
          .map((property) => (
            <Col key={property._id} md={4}>
              <div>
                <Link to={`/host/avalibility/${property._id}`}>
                  <MyCard property={property} />
                </Link>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PriceAvaliability;
