import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../../components/cards/BookCard";
import { useSelector } from "react-redux";

const ShoppingCard = () => {
  const SCproperties = useSelector((state) => state.SCproperties);
  const { userInfo } = useSelector((state) => state.auth);
  const { date } = useSelector((state) => state.date);

  return (
    <Container>
      <Row>
        {SCproperties.SCproperties.map((property) => (
          <Col key={property._id} md={4}>
            <BookCard property={property} userId={userInfo._id} date={date} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShoppingCard;
