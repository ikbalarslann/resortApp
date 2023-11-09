import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import findHost from "../../hooks/findHost";
import { removeProperty } from "../../slices/properties/SCproperties";
import "./scss/bookCard.scss";

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
    <div className="bookCard">
      <h2 className="bookCard__title">{property.title}</h2>

      <p className="bookCard__item">Description: {property.description}</p>
      <p className="bookCard__item">Location: {property.location}</p>

      <p className="bookCard__item">Date: {date}</p>

      <p className="bookCard__item">
        Space: {property.availability.map((e) => e.availableSpaces)}
      </p>
      <p className="bookCard__item">
        Price: {property.availability.map((e) => e.pricePerNight)}
      </p>

      {isBooked ? (
        <button className="bookCard__button" onClick={handlePaymentClick}>
          Pay Now
        </button>
      ) : (
        <button
          className="bookCard__button"
          onClick={handleBookingClick}
          disabled={property.availableSpace <= 0}
        >
          Book Now
        </button>
      )}
    </div>
  );
};

export default BookCard;
