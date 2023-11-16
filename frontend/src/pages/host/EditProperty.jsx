import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditCreateProperty from "../../components/EditCreateProperty";

const EditProperty = () => {
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
        console.log(`suggestedLocations: ${locations}`);
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

  const { hostInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    hostId: hostInfo._id,
    title: "",
    description: "",
    location: "",
    price: 0,
    space: 0,
  });

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { title, description, location, price, space } = data;
        setFormData((prevData) => ({
          ...prevData,
          title,
          description,
          location,
          price,
          space,
        }));
      })
      .catch((error) => {
        console.error("Error fetching property data:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //avaliability creation
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

    // create object to send to backend
    const updateData = {
      hostId: hostInfo._id,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      price: formData.price,
      space: formData.space,
      availability: availability,
    };

    if (!suggestedLocations.includes(updateData.location)) {
      addLocation(updateData.location);
    }

    fetch(`/api/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Property updated:", data);
      })
      .catch((error) => {
        console.error("Error creating property:", error);
      });

    Navigate("/host/properties");
    window.scrollTo(0, 0);
  };

  return (
    <EditCreateProperty
      title="Edit"
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditProperty;
