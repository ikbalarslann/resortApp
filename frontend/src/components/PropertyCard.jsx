import React from "react";
import { Card, Button } from "react-bootstrap";

const PropertyCard = ({ property, userId, date }) => {
  const handleBookingClick = async () => {
    try {
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          propertyId: property._id, // Assuming the property object has an _id field
          status: "Pending", // Or set the default status you want
          payment: false,
        }),
      });

      if (!bookingResponse.ok) {
        console.error("Booking failed");
        return;
      }

      const minusAvailableSpaceResponse = await fetch(
        `/api/properties/${property._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            availability: property.availability.map((element) => {
              if (element._id === sellectedAvalibilityDate._id) {
                return {
                  ...element,
                  availableSpaces: element.availableSpaces - 1,
                };
              }
              return element;
            }),
          }),
        }
      );

      if (minusAvailableSpaceResponse.ok) {
        // Update your local data (e.g., property state) here if needed
        console.log("Notification: Booking Pending");
      } else {
        console.error("Error updating available space");
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

        <Card.Text> Description : {property.description}</Card.Text>
        <Card.Text>Location: {property.location}</Card.Text>

        <Card.Text>date:{date}</Card.Text>

        <Card.Text>
          space: {property.availability.map((e) => e.availableSpaces)}
        </Card.Text>
        <Card.Text>
          price: {property.availability.map((e) => e.pricePerNight)}
        </Card.Text>

        <Button
          variant="primary"
          onClick={handleBookingClick}
          disabled={property.avaliableSpace <= 0}
        >
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
