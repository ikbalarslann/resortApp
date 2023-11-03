import React from "react";
import { Card, Button } from "react-bootstrap";
import { format } from "date-fns";

const PropertyCard = ({ property, userId, date }) => {
  const handleBookingClick = async () => {
    const minusAvailableSpace = async () => {
      const response = await fetch(`/api/properties/${property._id}`);
      if (response.ok) {
        const property = await response.json();

        const updatedAvailability = property.availability.map((element) => {
          if (format(new Date(element.date), "yyyy-MM-dd") === date) {
            // If the date matches, decrease the availableSpaces by 1
            return {
              ...element,
              availableSpaces: element.availableSpaces - 1,
            };
          }
          return element;
        });

        property.availability = updatedAvailability;

        const updateResponse = await fetch(`/api/properties/${property._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(property),
        });

        if (updateResponse.ok) {
          console.log("Avalibility decresed successfully");
        } else {
          console.error("Failed to update property");
        }
      } else {
        console.error("Failed to fetch the property by ID");
      }
    };
    const createBooking = async () => {
      fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          propertyId: property._id,
          date: format(new Date(date), "dd-MM-yyyy"),
          status: "Pending",
          payment: false,
        }),
      });
    };
    minusAvailableSpace();
    createBooking();
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

// const handleBookingClick = async () => {
//   try {
//     const bookingResponse = await fetch("/api/bookings", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId,
//         propertyId: property._id, // Assuming the property object has an _id field
//         status: "Pending", // Or set the default status you want
//         payment: false,
//       }),
//     });

//     if (!bookingResponse.ok) {
//       console.error("Booking failed");
//       return;
//     }

//     const minusAvailableSpaceResponse = await fetch(
//       `/api/properties/${property._id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           availability: property.availability.map((element) => {
//             if (element._id === sellectedAvalibilityDate._id) {
//               return {
//                 ...element,
//                 availableSpaces: element.availableSpaces - 1,
//               };
//             }
//             return element;
//           }),
//         }),
//       }
//     );

//     if (minusAvailableSpaceResponse.ok) {
//       // Update your local data (e.g., property state) here if needed
//       console.log("Notification: Booking Pending");
//     } else {
//       console.error("Error updating available space");
//     }
//   } catch (error) {
//     console.error("Error creating booking:", error);
//   }
// };
