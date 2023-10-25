import React from "react";
import { Card, Button } from "react-bootstrap";

const PropertyCard = ({ property, userId }) => {
  const handleBookingClick = async () => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          propertyId: property._id, // assuming the property object has an _id field
          status: "pending", // or set the default status you want
        }),
      });

      if (response.ok) {
        // Booking successful, you might want to handle this accordingly
        console.log("Booking successful");
      } else {
        // Booking failed, handle the error
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Host ID: {property.hostId}
        </Card.Subtitle>
        <Card.Text>{property.description}</Card.Text>
        <Card.Text>Location: {property.location}</Card.Text>
        <Button variant="primary" onClick={handleBookingClick}>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
