// Sidebar.jsx
import React, { useState, useEffect } from "react";
import "./scss/sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSProperties } from "../slices/properties/SpropertiesSlice";
import { set } from "mongoose";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.properties);

  const [allowedTypes, setAllowedTypes] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    updateProperties();
  }, [allowedTypes, availability, ratingValue]);

  const updateProperties = () => {
    const filterProperties = () => {
      try {
        let filteredProperties = properties;

        if (availability) {
          filteredProperties = filteredProperties.filter(
            (property) => property.availability[0].availableSpaces > 0
          );
        }

        filteredProperties = filteredProperties.filter((property) => {
          return allowedTypes.length === 0
            ? true
            : allowedTypes.includes(property.type);
        });

        if (ratingValue) {
          filteredProperties = properties.filter(
            (property) => averageReview(property) > ratingValue
          );
        }

        return filteredProperties;
      } catch (error) {
        console.error(error);
      }
    };

    const filteredProperties = filterProperties();
    dispatch(setSProperties(filteredProperties));
  };

  const handleTypeChange = (e, t) => {
    const newValue = e.target.checked;

    setAllowedTypes((prevAllowedTypes) => {
      const updatedTypes = newValue
        ? [...prevAllowedTypes, t]
        : prevAllowedTypes.filter((type) => type !== t);

      return updatedTypes;
    });
  };

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.checked);
  };

  const averageReview = (property) => {
    if (property.reviews.length === 0) return 0;

    let sum = 0;
    for (let i = 0; i < property.reviews.length; i++) {
      sum += property.reviews[i].rating;
    }

    const avg = sum / property.reviews.length;

    const roundedAvg = Math.round(avg * 2) / 2;

    return roundedAvg.toFixed(1);
  };

  const handleRatingChange = (r) => {
    const ratingCheckboxes = document.querySelectorAll(
      ".sidebar__title__checkbox.rating"
    );

    // If the clicked checkbox is already checked, uncheck all rating checkboxes
    if (ratingValue === r) {
      ratingCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      setRatingValue(0); // Reset the rating filter
    } else {
      // Otherwise, check only the clicked checkbox
      ratingCheckboxes.forEach((checkbox) => {
        if (parseFloat(checkbox.value) === r) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });

      setRatingValue(r); // Set the rating filter to the clicked value
    }
  };

  return (
    <div className="sidebar">
      <h4 className="sidebar__title">Availability</h4>
      <label className="sidebar__title__checkbox-label">
        <input
          className="sidebar__title__checkbox"
          type="checkbox"
          onChange={handleAvailabilityChange}
        />
        Available
      </label>

      <h4 className="sidebar__title">Pool Style</h4>
      <div className="sidebar__title__options">
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            onChange={(e) => handleTypeChange(e, "Olimpic")}
          />
          Olympic
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            onChange={(e) => handleTypeChange(e, "Semi-Olimpic")}
          />
          Semi Olympic
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            onChange={(e) => handleTypeChange(e, "Hotel Pool")}
          />
          Hotel Pool
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            onChange={(e) => handleTypeChange(e, "Aqua Park")}
          />
          Aquapark
        </label>
      </div>
      <h4 className="sidebar__title">Guest rating</h4>
      <div className="sidebar__title__options">
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox rating"
            type="checkbox"
            onChange={() => handleRatingChange(3)}
            checked={ratingValue === 3}
          />
          +3
        </label>
        <label className="sidebar__title__checkbox-label ">
          <input
            className="sidebar__title__checkbox rating"
            type="checkbox"
            onChange={() => handleRatingChange(4)}
            checked={ratingValue === 4}
          />
          +4
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox rating"
            type="checkbox"
            onChange={() => handleRatingChange(4.5)}
            checked={ratingValue === 4.5}
          />
          +4.5
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
