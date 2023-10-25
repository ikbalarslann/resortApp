import React from "react";
import { Card } from "react-bootstrap";

const MyPropertyCard = ({ property }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Host ID: {property.hostId}
        </Card.Subtitle>
        <Card.Text>{property.description}</Card.Text>
        <Card.Text>Location: {property.location}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyPropertyCard;
