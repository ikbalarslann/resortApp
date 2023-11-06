import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import findHost from "../../hooks/findHost";
import { removeProperty } from "../../slices/SCproperties";

const BookCard = ({ property, userId, date }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { SCproperties } = useSelector((state) => state.SCproperties);

  const dispatch = useDispatch();

  const handleBookingClick = async () => {
    // const propertyExistsInCart = SCproperties.some(
    //   (p) => p._id === property._id
    // );

    // if (propertyExistsInCart) {
    //   console.log("Property already in cart");
    //   return;
    // }

    const minusAvailableSpace = async () => {
      const response = await fetch(`/api/properties/${property._id}`);
      if (response.ok) {
        const property = await response.json();

        const updatedAvailability = property.availability.map((element) => {
          if (format(new Date(element.date), "yyyy-MM-dd") === date) {
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
      })
        .then((response) => response.json())
        .then((data) => setBookingId(data._id));
    };
    minusAvailableSpace();
    createBooking();
    setIsBooked(true);
  };

  const handlePaymentClick = async () => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment: true }),
      });

      if (response.ok) {
        dispatch(removeProperty(property._id));
      } else {
        console.error("Payment failed");
      }

      const host = await findHost(bookingId);

      host &&
        console.log(
          `Notification : Property succesfully booked by  Customer : ${userInfo.name} from  Host : ${host.name}`
        );

      setTimeout(() => {
        console.log("Notification : Review now");
      }, 3000);
    } catch (error) {
      console.error("Error processing payment:", error);
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
        {isBooked ? (
          <Button variant="primary" onClick={handlePaymentClick}>
            Pay Now
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleBookingClick}
            disabled={property.avaliableSpace <= 0}
          >
            Book Now
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookCard;
