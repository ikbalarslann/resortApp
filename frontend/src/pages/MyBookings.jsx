import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import findHost from "../hooks/findHost";

const MyBookings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");

  const handleModalSubmit = async (booking) => {
    const review = { userId: userInfo._id, rating, text: reviewText };
    const property = await fetch(`/api/properties/${booking.propertyId}`).then(
      (data) => data.json()
    );

    const updatedReviews = [...property.reviews, review];

    try {
      const response = await fetch(`/api/properties/${property._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviews: updatedReviews }),
      });

      if (response.ok) {
        console.log("Review submitted successfully.");
        setShowModal(false);
      } else {
        console.error("Failed to submit the review.");
      }
    } catch (error) {
      console.error("Error while submitting the review:", error);
    }
  };

  useEffect(() => {
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data) => {
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
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, payment: true } : booking
          )
        );
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

              {booking.payment ? (
                <Button variant="primary" onClick={() => setShowModal(true)}>
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Leave a Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Rating (1-5)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Review Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleModalSubmit(booking)}
                >
                  Submit Review
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default MyBookings;
