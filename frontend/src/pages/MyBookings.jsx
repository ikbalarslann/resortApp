import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import findHost from "../hooks/findHost";

const MyBookings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch all bookings using an API endpoint
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        // Filter bookings based on the current user's ID
        const userBookings = data.filter(
          (booking) => booking.userId === userInfo._id
        );
        setBookings(userBookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userInfo._id]);

  const handlePayment = async (bookingId) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment: true }),
      });

      if (response.ok) {
        // Payment successful, update the local state
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, payment: true } : booking
          )
        );
      } else {
        // Payment failed, handle the error
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

  const handleReview = async (propertyId) => {
    try {
      const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userInfo._id, propertyId, rating: 2 }),
      });

      // Handle the response as needed
      if (response.ok) {
        console.log(
          `Notification : Review submitted successfully for Property : ${propertyId}`
        );
        // You can update your state or perform other actions upon successful review submission
      } else {
        console.error("Review submission failed");
      }
    } catch (error) {
      console.error("Error processing review:", error);
    }
  };

  return (
    <Container>
      <h1>My Bookings</h1>
      <div className="d-flex flex-wrap">
        {bookings.map((booking) => (
          <Card key={booking._id} className="m-2" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Booking ID: {booking._id}</Card.Title>
              <Card.Text>Status: {booking.status}</Card.Text>
              <Card.Text>
                Payment: {booking.payment ? "true" : "false"}
              </Card.Text>
              {/* Add more details as needed */}
              {booking.payment ? (
                <Button
                  variant="primary"
                  onClick={() => handleReview(booking.propertyId)}
                >
                  Review
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => handlePayment(booking._id)}
                >
                  Pay now
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default MyBookings;
