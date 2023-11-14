import React, { useState } from "react";
import "../scss/hostSidebar.scss";
import { Link } from "react-router-dom";

const HostSidebar = () => {
  const [checkedCheckbox, setCheckedCheckbox] = useState(null);

  const handleCheckboxChange = (e) => {
    const { name } = e.target;

    setCheckedCheckbox((prevChecked) => (prevChecked === name ? null : name));

    console.log(name);
  };

  return (
    <div className="hostsidebar">
      <div className="hostsidebar__category">
        <h1 className="hostsidebar-header">Properties</h1>
        <label className="hostsidebar-header__checkbox-label">
          <input
            type="checkbox"
            name="allProperties"
            onChange={handleCheckboxChange}
            checked={checkedCheckbox === "allProperties"}
            className="hostsidebar-header__checkbox"
          />
          All
        </label>
        <label className="hostsidebar-header__checkbox-label">
          <input
            type="checkbox"
            name="property1"
            onChange={handleCheckboxChange}
            checked={checkedCheckbox === "property1"}
            className="hostsidebar-header__checkbox"
          />
          Property 1
        </label>
        <label className="hostsidebar-header__checkbox-label">
          <input
            type="checkbox"
            name="property2"
            onChange={handleCheckboxChange}
            checked={checkedCheckbox === "property2"}
            className="hostsidebar-header__checkbox"
          />
          Property 2
        </label>
        <label className="hostsidebar-header__checkbox-label">
          <input
            type="checkbox"
            name="property3"
            onChange={handleCheckboxChange}
            checked={checkedCheckbox === "property3"}
            className="hostsidebar-header__checkbox"
          />
          Property 3
        </label>
      </div>
      <div className="hostsidebar__category">
        <h1 className="hostsidebar-header">Pages</h1>
        <Link to="/host/bookings">
          <div className="hostsidebar-page">Bookings</div>
        </Link>
        <Link to="/host/avalibility">
          <div className="hostsidebar-page">Price and Availability</div>
        </Link>
        <Link to="/host/analytics">
          <div className="hostsidebar-page">Analytics</div>
        </Link>
      </div>
    </div>
  );
};

export default HostSidebar;
