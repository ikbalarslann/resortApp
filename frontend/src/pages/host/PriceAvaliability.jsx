// PriceAvaliabilityEdit.js
import React, { useState, useEffect, useRef } from "react";
import ModalAvaliability from "./ModalAvaliability";
import { format } from "date-fns";
import "./scss/priceAvaliability.scss";
import { useSelector } from "react-redux";

const PriceAvaliability = () => {
  const [availability, setAvailability] = useState([]);
  const [filteredAvailability, setFilteredAvailability] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { Hproperties } = useSelector((state) => state.Hproperties);

  const availableSpacesRef = useRef();
  const pricePerNightRef = useRef();

  useEffect(() => {
    setAvailability(Hproperties[0].availability);
  }, [Hproperties]);

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

    fetch(`/api/properties/${Hproperties[0]._id}`, {
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
      <h1 className="PandAe__title">November</h1>
      <h2 className="PandAe__title">Property Name: {Hproperties[0].title}</h2>

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
        date={
          filteredAvailability
            ? format(new Date(filteredAvailability[0].date), "dd/MM/yyyy")
            : ""
        }
      />
    </div>
  );
};

export default PriceAvaliability;
