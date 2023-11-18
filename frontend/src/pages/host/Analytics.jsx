import { useState, useEffect } from "react";
import NivoBar from "../../components/nivo/NivoBar";
import { format } from "date-fns";
import NivoPie from "../../components/nivo/NivoPie";
import { useSelector } from "react-redux";
import NivoCallendar from "../../components/nivo/NivoCallendar";

const Analytics = () => {
  const [property, setProperty] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [avaliability, setAvaliability] = useState([]);

  const { Hproperties } = useSelector((state) => state.Hproperties);

  useEffect(() => {
    const fetchData = async () => {
      if (Hproperties.length > 1) {
        const bookingsResponse = await fetch(`/api/bookings`);
        const bookingsData = await bookingsResponse.json();

        const filteredBookings = [];

        for (let i = 0; i < Hproperties.length; i++) {
          const propertyData = Hproperties[i];

          const data = bookingsData.filter(
            (b) => b.propertyId === propertyData._id
          );
          filteredBookings.push(...data);
        }
        setBookings(filteredBookings);

        const filteredAvailability = [];

        Hproperties[0].availability.map((k) => {
          let space = 0;

          for (let i = 0; i < Hproperties.length; i++) {
            const propertyData = Hproperties[i];

            const data = propertyData.availability.filter(
              (a) => a.date === k.date
            );
            space += data[0].availableSpaces;
          }

          filteredAvailability.push({
            date: format(new Date(k.date), "dd-MM-yyyy"),
            price: k.pricePerNight,
            space: space,
          });
        });

        setAvaliability(filteredAvailability);
      } else if (Hproperties.length === 0) {
        console.log("No properties");
      } else {
        try {
          setProperty(Hproperties[0]);

          const bookingsResponse = await fetch(`/api/bookings`);
          const bookingsData = await bookingsResponse.json();
          const filteredBookings = bookingsData.filter(
            (b) => b.propertyId === Hproperties[0]._id
          );
          setBookings(filteredBookings);

          const propertyData = Hproperties[0];
          const filteredAvailability = await propertyData.availability.map(
            (a) => ({
              date: format(new Date(a.date), "dd-MM-yyyy"),
              price: a.pricePerNight,
              space: a.availableSpaces,
            })
          );

          setAvaliability(filteredAvailability);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    fetchData();
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

  const dailyRevenue = (date) => {
    const price = avaliability.filter((a) => a.date === date)[0].price;
    const booking = bookings.filter((b) => b.date === date).length;
    return price * booking;
  };

  const bookingsData = filterBookingData(bookings).map((b) => {
    return {
      date: b.day.slice(0, 2),
      booking: b.booking,
      bookingColor: "hsl(62, 70%, 50%)",
    };
  });

  const moneyData = avaliability.map((a) => {
    return {
      date: a.date.slice(0, 2),
      money: dailyRevenue(a.date),
      moneyColor: "hsl(62, 70%, 50%)",
    };
  });

  const occupancyData = avaliability.map((a) => {
    const bookingsThatDay = bookings.filter((b) => b.date === a.date).length;
    return {
      date: a.date.slice(0, 2),
      empty: a.space,
      emptyColor: "grey",
      booked: bookingsThatDay,
      bookedColor: "green",
    };
  });

  const occupancyMonthlyPie = () => {
    let emptySpaces = 0;
    let bookedSpaces = 0;

    avaliability.map((a) => {
      const bookingsThatDay = bookings.filter((b) => b.date === a.date).length;
      emptySpaces += a.space;
      bookedSpaces += bookingsThatDay;
    });

    return [
      {
        id: "empty",
        label: "empty",
        value: emptySpaces,
        color: "hsl(222, 70%, 50%)",
      },
      {
        id: "booked",
        label: "booked",
        value: bookedSpaces,
        color: "hsl(326, 70%, 50%)",
      },
    ];
  };

  const callendarData = avaliability.map((a) => {
    const parts = a.date.split("-");
    const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];

    const bookingsThatDay = bookings.filter((b) => b.date === a.date).length;
    const occupancyThatDay =
      (bookingsThatDay / (a.space + bookingsThatDay)) * 100;

    const moneyThatDay = bookingsThatDay * a.price;

    return {
      day: formattedDate,
      booking: bookingsThatDay,
      value: occupancyThatDay,
      money: moneyThatDay,
    };
  });

  return (
    <>
      <h1>Property Analytics</h1>
      {property ? (
        <>
          <h3>{Hproperties.length > 1 ? "All Properties" : property.title}</h3>
          <h6>{`Bookings: ${bookings.length}`}</h6>
        </>
      ) : (
        <p>Loading property data...</p>
      )}
      <div style={{ height: "300px", width: "80vw", paddingBottom: "100px" }}>
        <h2>Bookings</h2>
        {/* <NivoBar data={filterBookingData(bookings)} leftkey={"booking"} /> */}

        <NivoBar
          data={bookingsData}
          keys={["booking"]}
          leftLegend={"bookings"}
        />
      </div>
      <div style={{ height: "300px", width: "80vw", paddingBottom: "100px" }}>
        <h2>Money</h2>
        <NivoBar data={moneyData} keys={["money"]} leftLegend={"revenue"} />
      </div>
      <div style={{ height: "300px", width: "80vw", paddingBottom: "100px" }}>
        <h2>Occupancy</h2>
        <NivoBar
          data={occupancyData}
          keys={["booked", "empty"]}
          leftLegend={"occupancy"}
        />
      </div>
      <div style={{ height: "300px", width: "80vw", paddingBottom: "100px" }}>
        <h2>Monthly Occupancy </h2>
        <NivoPie data={occupancyMonthlyPie()} />
      </div>
      <div style={{ height: "300px", width: "80vw", paddingBottom: "100px" }}>
        <NivoCallendar data={callendarData} />
      </div>
    </>
  );
};

export default Analytics;
