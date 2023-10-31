import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const HostBookings = () => {
  const { hostInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [hostData, setHostData] = useState({
    properties: [],
    bookings: [],
    users: [],
  });

  useEffect(() => {
    // Fetch both property and booking data
    Promise.all([
      fetch(`/api/properties`).then((response) => response.json()),
      fetch(`/api/bookings`).then((response) => response.json()),
      fetch("/api/users").then((response) => response.json()),
    ])
      .then(([propertyData, bookingData, userData]) => {
        // Filter properties that match the hostId
        const filteredProperties = propertyData.filter(
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
            const propertyTitle = propertyData.find(
              (p) => p._id === property._id
            )?.title;
            return { ...property, title: propertyTitle };
          }
        );

        // Set the combined host data state
        setHostData({
          properties: filteredPropertiesWithTitles,
          bookings: filteredBookings,
          users: filteredUsers,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [hostInfo._id]);

  return (
    <div>
      <h1>Host Bookings</h1>
      <div>
        {hostData.bookings.map((booking, index) => (
          <Card key={index}>
            <Card.Body>
              <Card.Text>number: {index + 1}</Card.Text>
              <Card.Text>
                Customer Name:{" "}
                {
                  hostData.users.find((user) => user._id === booking.userId)
                    ?.name
                }
              </Card.Text>
              <Card.Text>
                Property Title:{" "}
                {
                  hostData.properties.find(
                    (property) => property._id === booking.propertyId
                  )?.title
                }
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HostBookings;
