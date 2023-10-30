import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditProperty = () => {
  const { hostInfo } = useSelector((state) => state.auth);
  const { id } = useParams();

  // State to store form input values
  const [formData, setFormData] = useState({
    hostId: hostInfo._id,
    title: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    // Fetch the existing property data using `id` and set it in the form
    fetch(`/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { title, description, location } = data; // Replace with actual data fields
        setFormData((prevData) => ({
          ...prevData,
          title,
          description,
          location,
        }));
      })
      .catch((error) => {
        console.error("Error fetching property data:", error);
      });
  }, [id]);

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

    fetch(`/api/properties/${id}`, {
      method: "PUT",
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
      <h1>Edit Property</h1>
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

        {/* Note: hostId is set automatically in formData */}

        <Button variant="primary" type="submit">
          Edit Property
        </Button>
      </Form>
    </Container>
  );
};

export default EditProperty;
