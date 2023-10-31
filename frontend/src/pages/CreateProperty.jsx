import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const CreateProperty = () => {
  const { hostInfo } = useSelector((state) => state.auth);

  // State to store form input values
  const [formData, setFormData] = useState({
    hostId: hostInfo._id,
    title: "",
    description: "",
    location: "",
    price: 0,
    avaliableSpace: 0,
  });

  // Handler to update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform actions to create property using formData
    // For simplicity, let's assume you have an API endpoint for property creation

    fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., redirect to property details page
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
            placeholder="choose price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="avaliableSpace">
          <Form.Label>Avaliable Space :</Form.Label>
          <Form.Control
            type="number"
            placeholder="choose avaliable space"
            name="avaliableSpace"
            value={formData.avaliableSpace}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Note: hostId is set automatically in formData */}

        <Button variant="primary" type="submit">
          Create Property
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProperty;
