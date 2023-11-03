import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { format, set } from "date-fns";

const PropertyCard = ({ property, userId, date }) => {
  const [showReviewButton, setShowReviewButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");

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
    setShowReviewButton(true);
  };

  const handleModalSubmit = async () => {
    const review = { userId, rating, text: reviewText };

    // Update the property's reviews array with the new review
    const updatedReviews = [...property.reviews, review];

    try {
      const response = await fetch(`/api/properties/${property._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviews: updatedReviews }), // Corrected the body format
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
        {showReviewButton ? (
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Review
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
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default PropertyCard;
