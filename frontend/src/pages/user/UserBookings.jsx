import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import findHost from "../../hooks/findHost";
import Modal from "./Modal";
import "./scss/userBookings.scss";

const UserBookings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { date } = useSelector((state) => state.date);
  const [bookings, setBookings] = useState([]);
  const [showModals, setShowModals] = useState([]);

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
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userInfo._id]);

  const handlePayment = async (bookingId, index) => {
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
          prevBookings.map((booking, i) =>
            i === index ? { ...booking, payment: true } : booking
          )
        );
      } else {
        console.error("Payment failed");
      }

      const host = await findHost(bookingId);

      host &&
        console.log(
          `Notification : Property successfully booked by Customer: ${userInfo.name} from Host: ${host.name}`
        );

      setTimeout(() => {
        console.log("Notification: Review now");
      }, 3000);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

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

              {booking.payment ? (
                <button
                  className="userBookings-card-button"
                  onClick={() => handleReview(index)}
                >
                  Review
                </button>
              ) : (
                <button
                  className="userBookings-card-button"
                  onClick={() => handlePayment(booking._id, index)}
                >
                  Pay now
                </button>
              )}
            </div>
            {showModals[index] && (
              <Modal
                userInfo={userInfo}
                setShowModal={() => handleCloseModal(index)}
                booking={booking}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
