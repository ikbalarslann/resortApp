import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";

const PriceAvaliabilityEdit = () => {
  const { id } = useParams();
  const [availability, setAvailability] = useState([]);

  const [filteredAvailability, setFilteredAvailability] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");

  const availableSpacesRef = useRef();
  const pricePerNightRef = useRef();

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data && setName(data.title);

        return data.availability;
      })
      .then((data) => {
        setAvailability(data);
      });
  }, [id]);

  const handleClick = (date) => {
    setFilteredAvailability(availability.filter((item) => item.date === date));

    setShowModal(true);
  };

  const handleFormSubmit = () => {
    const updatedAvalibility = {
      ...filteredAvailability[0],
      availableSpaces: availableSpacesRef.current.value,
      pricePerNight: pricePerNightRef.current.value,
    };

    const updatedCollection = availability.map((item) => {
      if (item.date === updatedAvalibility.date) {
        return updatedAvalibility;
      }
      return item;
    });

    fetch(`/api/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availability: updatedCollection,
      }),
    }).then((response) => response.json());

    setShowModal(false);
  };

  return (
    <Container>
      <h1>Price Availability Edit</h1>
      <h2>Property Name: {name}</h2>

      {availability.length > 0 &&
        availability.map((item, index) => (
          <Card
            key={index}
            style={{ marginBottom: "20px" }}
            onClick={() => handleClick(item.date)}
          >
            <Card.Body>
              <Card.Title>
                Date: {format(new Date(item.date), "dd/MM/yyyy")}
              </Card.Title>
              <Card.Text>Available Space: {item.availableSpaces}</Card.Text>
              <Card.Text>Price: {item.pricePerNight}</Card.Text>
            </Card.Body>
          </Card>
        ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Available Spaces</Form.Label>
              <Form.Control
                type="text"
                defaultValue={
                  filteredAvailability
                    ? filteredAvailability[0].availableSpaces
                    : ""
                }
                ref={availableSpacesRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price Per Night</Form.Label>
              <Form.Control
                type="text"
                defaultValue={
                  filteredAvailability
                    ? filteredAvailability[0].pricePerNight
                    : ""
                }
                ref={pricePerNightRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PriceAvaliabilityEdit;
