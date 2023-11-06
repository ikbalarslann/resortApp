import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddCard from "../../components/cards/AddCard";
import { useSelector } from "react-redux";

const Property = () => {
  const Reduxproperties = useSelector((state) => state.properties);
  const { userInfo } = useSelector((state) => state.auth);
  const { date } = useSelector((state) => state.date);

  return (
    <Container>
      <Row>
        {Reduxproperties.properties.map((property) => (
          <Col key={property._id} md={4}>
            <AddCard property={property} userId={userInfo._id} date={date} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Property;
