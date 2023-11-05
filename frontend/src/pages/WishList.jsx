import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropertyCard from "../components/Property_Card";
import { useSelector } from "react-redux";

const WishList = () => {
  const WLproperties = useSelector((state) => state.WLproperties);
  const { date } = useSelector((state) => state.date);

  return (
    <Container>
      <Row>
        {WLproperties.WLproperties.map((property) => (
          <Col key={property._id} md={4}>
            <PropertyCard
              property={property}
              date={date}
              isShowWishList={false}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WishList;
