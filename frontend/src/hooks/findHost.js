const findHost = async (bookingId) => {
  try {
    const bookingResponse = await fetch(`/api/bookings/${bookingId}`);
    const booking = await bookingResponse.json();

    const propertyResponse = await fetch(
      `/api/properties/${booking?.propertyId}`
    );
    const property = await propertyResponse.json();

    const hostResponse = await fetch(`/api/hosts/${property?.hostId}`);
    const host = await hostResponse.json();

    if (!booking || !property || !host) {
      console.log("Loading...");
      return null;
    }

    return host;
  } catch (error) {
    console.error("Error in fetching data:", error);
    return null;
  }
};

export default findHost;
