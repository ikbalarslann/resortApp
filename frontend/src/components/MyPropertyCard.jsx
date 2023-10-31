import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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

        <Card.Text>Price: ${property.price}</Card.Text>
        <Card.Text>Avaliable Space: {property.avaliableSpace}</Card.Text>

        <Link to={`/editProperty/${property._id}`}>
          <Button variant="primary">Edit</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MyPropertyCard;
