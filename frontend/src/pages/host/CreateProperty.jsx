import React, { useState, useEffect } from "react";
import EditCreateProperty from "../../components/EditCreateProperty";
import { useSelector } from "react-redux";
const CreateProperty = () => {
  const { hostInfo } = useSelector((state) => state.auth);
  const [suggestedLocations, setSuggestedLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/locations");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const locations = data.map((location) => location.location);

        setSuggestedLocations(locations);
        // You can set the locations in your component state if needed
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addLocation = (location) => {
    fetch("/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location }),
    });
  };

  const [formData, setFormData] = useState({
    hostId: hostInfo._id,
    title: "",
    description: "",
    location: "",
    price: 0,
    space: 0,
    type: "",
    images: [],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const availability = [];
      const startDate = new Date(2023, 10, 1);
      const endDate = new Date(2023, 10, 30);
      const availableSpace = formData.space;
      const pricePerNight = formData.price;
      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        availability.push({
          date: new Date(date),
          availableSpaces: availableSpace,
          pricePerNight: pricePerNight,
        });
      }

      const updatedFormData = {
        hostId: formData.hostId,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: formData.price,
        space: formData.space,
        type: formData.type,
        images: formData.images,
        availability,
      };

      if (!suggestedLocations.includes(updatedFormData.location)) {
        addLocation(updatedFormData.location);
      }

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const propertyData = await response.json();
        console.log("Property created:", propertyData);
      } else {
        console.error("Error creating property:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <EditCreateProperty
      title="Create"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateProperty;
