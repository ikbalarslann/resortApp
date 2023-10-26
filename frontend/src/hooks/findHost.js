import { useEffect, useState } from "react";

const useFind = (route, id) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${route}/${id}`);
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error(`Error in fetching ${route}:`, error);
        setData(null);
      }
    };

    fetchData();
  }, [route, id]);

  return data;
};

const findHost = (bookingId) => {
  const booking = useFind("bookings", bookingId);
  const property = useFind("properties", booking?.propertyId);
  const host = useFind("hosts", property?.hostId);

  if (!booking || !property || !host) {
    return console.log("Loading...");
  }

  return host;
};

export default findHost;
