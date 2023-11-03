import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { format } from "date-fns";

const PriceAvaliabilityEdit = () => {
  const { id } = useParams();
  const [availability, setAvailability] = useState([]);
  const [name, setName] = useState("");

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

  const handleClick = (item) => {
    console.log(item);
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
            onClick={() => handleClick(item)}
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
    </Container>
  );
};

export default PriceAvaliabilityEdit;
