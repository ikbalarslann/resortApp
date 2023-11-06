import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NivoBar from "../components/NivoBar";
import { format } from "date-fns";
import NivoPie from "../components/NivoPie";

const PropertyAnalytics = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`/api/properties/${propertyId}`)
      .then((response) => response.json())
      .then((data) => {
        setProperty(data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    fetch(`/api/bookings`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((b) => b.propertyId === propertyId);
        setBookings(filteredData);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, [propertyId]);

  const filterBookingData = (bookings) => {
    const days = [];
    const startDate = new Date("2023-11-01");
    const endDate = new Date("2023-11-30");

    for (
      let currentDate = startDate;
      currentDate.getTime() <= endDate.getTime();
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      days.push(format(new Date(currentDate), "dd-MM-yyyy"));
    }

    const data = [];

    for (let i = 0; i < days.length; i++) {
      const day = days[i];

      const bookingsOnDay = bookings.filter((b) => b.date === day).length;

      const dayData = {
        day: day,
        booking: bookingsOnDay,
        bookingColor: "hsl(125, 70%, 50%)",
      };
      data.push(dayData);
    }

    return data;
  };

  return (
    <>
      <h1>Property Analytics</h1>
      <div style={{ height: "300px", width: "80vw", paddingBottom: "100px" }}>
        <h2>bookings-bar</h2>
        <NivoBar data={filterBookingData(bookings)} leftkey={"booking"} />
      </div>
      <div style={{ height: "300px", width: "80vw", paddingBottom: "100px" }}>
        <h2>occupancy - pie</h2>
        <NivoPie />
      </div>
      <h2>occupancy - pie</h2>
      <h2>money - bar</h2>
      <h2>callendar - each cell booking,occupancy,money</h2>
      {property ? (
        <>
          <h3>{property.title}</h3>
          <h4>{`Bookings: ${bookings.length}`}</h4>
        </>
      ) : (
        <p>Loading property data...</p>
      )}
    </>
  );
};

export default PropertyAnalytics;
