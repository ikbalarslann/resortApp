import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./scss/hostBookings.scss";

const HostBookings = () => {
  const { hostInfo } = useSelector((state) => state.auth);
  const { Hproperties } = useSelector((state) => state.Hproperties);
  const dispatch = useDispatch();

  const [hostData, setHostData] = useState({
    properties: [],
    bookings: [],
    users: [],
  });

  useEffect(() => {
    // Fetch both property and booking data
    Promise.all([
      fetch(`/api/bookings`).then((response) => response.json()),
      fetch("/api/users").then((response) => response.json()),
    ])
      .then(([bookingData, userData]) => {
        // Filter properties that match the hostId
        const filteredProperties = Hproperties.filter(
          (property) => property.hostId === hostInfo._id
        );

        // Filter bookings that match the property IDs from filteredProperties
        const filteredBookings = bookingData.filter((booking) =>
          filteredProperties
            .map((property) => property._id)
            .includes(booking.propertyId)
        );

        // Extract user IDs and property IDs from filtered bookings
        const userIds = filteredBookings.map((booking) => booking.userId);
        const propertyIds = filteredBookings.map(
          (booking) => booking.propertyId
        );

        // Get user and property data based on IDs
        const filteredUsers = userData.filter((user) =>
          userIds.includes(user._id)
        );
        const filteredPropertiesWithTitles = filteredProperties.map(
          (property) => {
            const propertyTitle = Hproperties.find(
              (p) => p._id === property._id
            )?.title;
            return { ...property, title: propertyTitle };
          }
        );

        setHostData({
          properties: filteredPropertiesWithTitles,
          bookings: filteredBookings,
          users: filteredUsers,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [hostInfo._id, Hproperties]);

  return (
    <div>
      <div>
        <h1>
          {hostData.bookings.length > 0 &&
            hostData.properties.find(
              (property) => property._id === hostData.bookings[0].propertyId
            )?.title}
        </h1>
        <h1>{hostData.bookings.length} bookings</h1>
        {hostData.bookings.map((booking, index) => (
          <div className="hostbookingcard" key={index}>
            <p className="hostbookingcard__text">Number: {index + 1}</p>
            <p className="hostbookingcard__text">Date: {booking.date}</p>
            <p className="hostbookingcard__text">
              Property Title:{" "}
              {
                hostData.properties.find(
                  (property) => property._id === booking.propertyId
                )?.title
              }
            </p>
            <p className="hostbookingcard__text">
              Customer Name:{" "}
              {hostData.users.find((user) => user._id === booking.userId)?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostBookings;
