// Sidebar.jsx
import React, { useState } from "react";
import "./scss/sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../slices/properties/propertiesSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.properties);

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

  //avaliability
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  //Pool Style
  const [olimpicChecked, setOlimpicChecked] = useState(false);
  const [semiOlimpicChecked, setSemiOlimpicChecked] = useState(false);
  const [hotelPoolChecked, setHotelPoolChecked] = useState(false);
  const [aquaparkChecked, setAquaparkChecked] = useState(false);

  //Guest rating
  const [guestRating3Checked, setGuestRating3Checked] = useState(false);
  const [guestRating4Checked, setGuestRating4Checked] = useState(false);
  const [guestRating45Checked, setGuestRating45Checked] = useState(false);

  //avaliability
  const handleAvailabilityChange = (e) => {
    setAvailabilityChecked(e.target.checked);
    if (e.target.checked) {
      const filteredProperties = properties.filter(
        (property) => property.availability[0].availableSpaces > 0
      );
      dispatch(setProperties(filteredProperties));
    } else {
      console.log("Availability checkbox is unchecked");
    }
  };

  //Pool Style
  const handleOlimpicChange = (e) => {
    setOlimpicChecked(e.target.checked);
    if (e.target.checked) {
      const filteredProperties = properties.filter(
        (property) => property.type === "Olimpic"
      );
      dispatch(setProperties(filteredProperties));
    } else {
      console.log("Olimpic checkbox is unchecked");
    }
  };
  const handleSemiOlimpicChange = (e) => {
    setSemiOlimpicChecked(e.target.checked);
    if (e.target.checked) {
      const filteredProperties = properties.filter(
        (property) => property.type === "SemiOlimpic"
      );
      dispatch(setProperties(filteredProperties));
    } else {
      console.log("SemiOlimpic checkbox is unchecked");
    }
  };
  const handleHotelPoolChange = (e) => {
    setHotelPoolChecked(e.target.checked);
    if (e.target.checked) {
      const filteredProperties = properties.filter(
        (property) => property.type === "HotelPool"
      );
      dispatch(setProperties(filteredProperties));
    } else {
      console.log("HotelPool checkbox is unchecked");
    }
  };
  const handleAquaparkChange = (e) => {
    setAquaparkChecked(e.target.checked);
    if (e.target.checked) {
      const filteredProperties = properties.filter(
        (property) => property.type === "Aquapark"
      );
      dispatch(setProperties(filteredProperties));
    } else {
      console.log("Aquapark checkbox is unchecked");
    }
  };

  //Guest rating
  const handleGuestRating3Change = (e) => {
    setGuestRating3Checked(e.target.checked);
    if (e.target.checked) {
      const filteredProperties = properties.filter(
        (property) => averageReview(property) > 3
      );
      dispatch(setProperties(filteredProperties));
    } else {
      console.log("GuestRating3 checkbox is unchecked");
    }
  };
  const handleGuestRating4Change = (e) => {
    setGuestRating4Checked(e.target.checked);
    if (e.target.checked) {
      const filteredProperties = properties.filter(
        (property) => averageReview(property) > 4
      );
      dispatch(setProperties(filteredProperties));
    } else {
      console.log("GuestRating4 checkbox is unchecked");
    }
  };
  const handleGuestRating45Change = (e) => {
    setGuestRating45Checked(e.target.checked);
    if (e.target.checked) {
      const filteredProperties = properties.filter(
        (property) => averageReview(property) > 4.5
      );
      dispatch(setProperties(filteredProperties));
    } else {
      console.log("GuestRating45 checkbox is unchecked");
    }
  };

  return (
    <div className="sidebar">
      <h4 className="sidebar__title">Availability</h4>
      <label className="sidebar__title__checkbox-label">
        <input
          className="sidebar__title__checkbox"
          type="checkbox"
          checked={availabilityChecked}
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
            checked={olimpicChecked}
            onChange={handleOlimpicChange}
          />
          Olympic
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            checked={semiOlimpicChecked}
            onChange={handleSemiOlimpicChange}
          />
          Semi Olympic
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            checked={hotelPoolChecked}
            onChange={handleHotelPoolChange}
          />
          Hotel Pool
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            checked={aquaparkChecked}
            onChange={handleAquaparkChange}
          />
          Aquapark
        </label>
      </div>
      <h4 className="sidebar__title">Guest rating</h4>
      <div className="sidebar__title__options">
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            checked={guestRating3Checked}
            onChange={handleGuestRating3Change}
          />
          +3
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            checked={guestRating4Checked}
            onChange={handleGuestRating4Change}
          />
          +4
        </label>
        <label className="sidebar__title__checkbox-label">
          <input
            className="sidebar__title__checkbox"
            type="checkbox"
            checked={guestRating45Checked}
            onChange={handleGuestRating45Change}
          />
          +4.5
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
