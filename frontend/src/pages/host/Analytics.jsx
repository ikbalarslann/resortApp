import { useState, useEffect } from "react";
import NivoBar from "../../components/nivo/NivoBar";
import { format } from "date-fns";
import NivoPie from "../../components/nivo/NivoPie";
import { useSelector } from "react-redux";

const Analytics = () => {
  const [property, setProperty] = useState(null);
  const [bookings, setBookings] = useState([]);

  const { Hproperties } = useSelector((state) => state.Hproperties);

  useEffect(() => {
    setProperty(Hproperties[0]);

    fetch(`/api/bookings`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (b) => b.propertyId === Hproperties[0]._id
        );
        setBookings(filteredData);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, [Hproperties]);

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

export default Analytics;
