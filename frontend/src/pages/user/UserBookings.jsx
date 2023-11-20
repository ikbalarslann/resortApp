import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import "./scss/userBookings.scss";

const UserBookings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [showModals, setShowModals] = useState([]);
  const [isShowReviewButton, setIsShowReviewButton] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        const userBookings = data.filter(
          (booking) => booking.userId === userInfo._id
        );
        setBookings(userBookings);
        // Initialize showModals array with false for each booking
        setShowModals(Array(userBookings.length).fill(false));
        setIsShowReviewButton(Array(userBookings.length).fill(true));
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userInfo._id]);

  const handleReview = (index) => {
    // Set the corresponding modal state to true
    setShowModals((prevModals) =>
      prevModals.map((modal, i) => (i === index ? true : modal))
    );
  };

  const handleCloseModal = (index) => {
    // Set the corresponding modal state to false
    setShowModals((prevModals) =>
      prevModals.map((modal, i) => (i === index ? false : modal))
    );
  };

  return (
    <div className="userBookings">
      <h1 className="userBookings__title">My Bookings</h1>
      <div
        className="userBookings__list"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {bookings.map((booking, index) => (
          <div
            key={booking._id}
            className="userBookings-card"
            style={{ margin: "10px", width: "18rem" }}
          >
            <div className="userBookings-card__content">
              <h1 className="userBookings-card__content-title">
                Title: {booking.propertyTitle}
              </h1>
              <h2 className="userBookings-card__content-title">
                Booking ID: {booking._id}
              </h2>
              <p className="userBookings-card__content-item">
                Status: {booking.status}
              </p>
              <p className="userBookings-card__content-item">
                Date: {booking.date}
              </p>
              <p className="userBookings-card__content-item">
                Payment: {booking.payment ? "true" : "false"}
              </p>

              {isShowReviewButton[index] && (
                <button
                  className="userBookings-card-button"
                  onClick={() => handleReview(index)}
                >
                  Review
                </button>
              )}
            </div>
            {showModals[index] && (
              <Modal
                userInfo={userInfo}
                setShowModal={() => handleCloseModal(index)}
                booking={booking}
                setIsShowReviewButton={setIsShowReviewButton}
                index={index}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
