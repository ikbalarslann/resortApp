import React, { useState } from "react";
import "./scss/modal.scss";

const Modal = ({ booking, setShowModal, userInfo }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const handleModalSubmit = async (booking) => {
    try {
      const propertyResponse = await fetch(
        `/api/properties/${booking.propertyId}`
      );
      if (!propertyResponse.ok) {
        console.error("Failed to fetch property data");
        return;
      }

      const property = await propertyResponse.json();

      const review = { userId: userInfo._id, rating, text: reviewText };
      const updatedReviews = [...property.reviews, review];

      const response = await fetch(`/api/properties/${property._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviews: updatedReviews }),
      });

      if (response.ok) {
        console.log(`Review submitted successfully.`);
        setShowModal(false);
      } else {
        console.error("Failed to submit the review.");
      }
    } catch (error) {
      console.error("Error while submitting the review:", error);
    }
  };

  return (
    <div className="userModal">
      <div className="userModal-header">
        <button
          className="userModal__button"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
      </div>
      <div className="userModal-body">
        <h2>Leave a Review</h2>
        <form>
          <div className="userModal__input">
            <label>Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="userModal__input">
            <label>Review Text</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="userModal-footer">
        <button
          className="userModal__button"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <button
          className="userModal__button"
          onClick={() => handleModalSubmit(booking)}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Modal;
