import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import { useSelector } from "react-redux";
import { selectProperties } from "../slices/searchSlice";

const Property = () => {
  const properties = useSelector(selectProperties);

  const { userInfo } = useSelector((state) => state.auth);

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
