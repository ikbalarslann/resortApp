import React from "react";
import "./scss/searchBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../slices/searchbars/dateSlice";

const DateSearchbar = () => {
  const { date } = useSelector((state) => state.date);

  const dispatch = useDispatch();

  const handleDateChange = (e) => {
    const value = e.target.value;
    dispatch(setDate(value));
  };

  return (
    <div className="searchBar-cover">
      <div className="searchBar" style={{ maxWidth: "25vw", maxHeight: "8vh" }}>
        <label htmlFor="date" className="searchBar__label"></label>
        <input
          className="searchBar__input"
          style={{ maxWidth: "25vw", maxHeight: "6vh" }}
          type="date"
          id="date"
          placeholder="Search by date"
          value={date || ""}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default DateSearchbar;
