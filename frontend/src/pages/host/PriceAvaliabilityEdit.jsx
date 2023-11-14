// PriceAvaliabilityEdit.js
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ModalAvaliability from "./ModalAvaliability";
import { format } from "date-fns";
import "./scss/priceAvaliabilityEdit.scss";

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
    const updatedAvailability = {
      ...filteredAvailability[0],
      availableSpaces: availableSpacesRef.current.value,
      pricePerNight: pricePerNightRef.current.value,
    };

    const updatedCollection = availability.map((item) => {
      if (item.date === updatedAvailability.date) {
        return updatedAvailability;
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
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="PandAe">
      <h1 className="PandAe__title">Price Availability Edit</h1>
      <h2 className="PandAe__title">Property Name: {name}</h2>

      {availability.length > 0 &&
        availability.map((item, index) => (
          <div
            className="PandAe-card"
            key={index}
            onClick={() => handleClick(item.date)}
          >
            <div className="PandAe-card__body">
              <h3 className="PandAe__title">
                Date: {format(new Date(item.date), "dd/MM/yyyy")}
              </h3>
              <p className="PandAe-card__text">
                Available Space: {item.availableSpaces}
              </p>
              <p className="PandAe-card__text">Price: {item.pricePerNight}</p>
            </div>
          </div>
        ))}

      <ModalAvaliability
        showModal={showModal}
        handleClose={handleClose}
        handleFormSubmit={handleFormSubmit}
        availableSpaces={
          filteredAvailability ? filteredAvailability[0].availableSpaces : ""
        }
        pricePerNight={
          filteredAvailability ? filteredAvailability[0].pricePerNight : ""
        }
        availableSpacesRef={availableSpacesRef}
        pricePerNightRef={pricePerNightRef}
      />
    </div>
  );
};

export default PriceAvaliabilityEdit;
