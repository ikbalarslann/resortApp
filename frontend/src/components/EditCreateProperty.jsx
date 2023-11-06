import React from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";

const EditCreateProperty = ({ title, formData, setFormData, handleSubmit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <FormContainer>
      <h1>{`${title} Property`}</h1>
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
          <Form.Label>{"$"} Price </Form.Label>
          <Form.Control
            type="number"
            placeholder="Choose price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="space">
          <Form.Label>Avaliable Space</Form.Label>
          <Form.Control
            type="number"
            placeholder="Choose available space"
            name="space"
            value={formData.space}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {`${title} Property`}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EditCreateProperty;
