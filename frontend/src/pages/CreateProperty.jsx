import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const CreateProperty = () => {
  const { hostInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    hostId: hostInfo._id,
    title: "",
    description: "",
    location: "",
    price: 0,
    availability: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData((prevData) => {
      const startDate = new Date(2023, 10, 1);
      const endDate = new Date(2023, 10, 2);
      const availableSpaces = 4;
      const pricePerNight = prevData.price;

      const availability = [];

      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        availability.push({
          date: new Date(date),
          availableSpaces: availableSpaces,
          pricePerNight: pricePerNight,
        });
      }

      return {
        ...prevData,
        availability: availability,
      };
    });

    fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Uses the updated state with availability data
    })
      .then((response) => response.json())
      .then((propertyData) => {
        console.log("Property created:", propertyData);
      })
      .catch((error) => {
        console.error("Error creating property:", error);
      });
  };

  return (
    <Container>
      <h1>Create Property</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price{"$"}</Form.Label>
          <Form.Control
            type="number"
            placeholder="Choose price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Property
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProperty;
