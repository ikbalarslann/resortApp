import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSCproperties } from "../slices/SCproperties";
import { useState } from "react";

const PropertyCard = ({ property, date }) => {
  const dispatch = useDispatch();
  const { SCproperties } = useSelector((state) => state.SCproperties);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCardClick = async () => {
    setIsAddedToCart(true);
    dispatch(setSCproperties([...SCproperties, property]));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Host ID: {property.hostId}
        </Card.Subtitle>

        <Card.Text> Description : {property.description}</Card.Text>
        <Card.Text>Location: {property.location}</Card.Text>

        <Card.Text>date:{date}</Card.Text>

        <Card.Text>
          space: {property.availability.map((e) => e.availableSpaces)}
        </Card.Text>
        <Card.Text>
          price: {property.availability.map((e) => e.pricePerNight)}
        </Card.Text>

        {isAddedToCart ? (
          "added to cart"
        ) : (
          <Button
            variant="primary"
            onClick={handleAddToCardClick}
            disabled={property.avaliableSpace <= 0}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
