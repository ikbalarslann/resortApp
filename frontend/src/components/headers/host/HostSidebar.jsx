import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHProperties } from "../../../slices/properties/HpropertiesSlice";
import "../scss/hostSidebar.scss";
import { Link } from "react-router-dom";

const HostSidebar = () => {
  const [checkedCheckbox, setCheckedCheckbox] = useState(null);
  const [properties, setProperties] = useState([]);
  const { hostInfo } = useSelector((state) => state.auth);
  const { Hproperties } = useSelector((state) => state.Hproperties);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/properties");

        if (response.ok) {
          const data = await response.json();
          const filteredData = data.filter(
            (property) => property.hostId === hostInfo?._id
          );
          setProperties(filteredData);
          dispatch(setHProperties(filteredData));
        } else {
          // Handle the error if needed
          console.error("Failed to fetch data");
        }
      } catch (error) {
        // Handle any other errors that might occur during the fetch
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, [hostInfo?._id]);

  console.log(Hproperties);

  const handleCheckboxChange = (e) => {
    const { name } = e.target;

    setCheckedCheckbox((prevChecked) => (prevChecked === name ? null : name));

    if (name === "allProperties") {
      dispatch(setHProperties(properties));
    }
    if (name !== "allProperties") {
      const filteredPropery = properties.filter(
        (property) => property.title === name
      );
      dispatch(setHProperties(filteredPropery));
    }
  };

  function selectPage(page) {
    // Remove the 'selected' class from all pages
    const pages = document.querySelectorAll(".hostsidebar-page");
    pages.forEach((page) => {
      page.classList.remove("selected");
    });

    // Add the 'selected' class to the clicked page
    const selectedPage = document.getElementById(page);
    selectedPage.classList.add("selected");
  }

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
        {properties.map((property, index) => (
          <div key={index}>
            <label className="hostsidebar-header__checkbox-label">
              <input
                type="checkbox"
                name={property.title}
                onChange={handleCheckboxChange}
                checked={checkedCheckbox === property.title}
                className="hostsidebar-header__checkbox"
              />
              {property.title}
            </label>
          </div>
        ))}
      </div>
      <div className="hostsidebar__category">
        <h1 className="hostsidebar-header">Pages</h1>
        <Link to="/host/bookings" onClick={() => selectPage("bookings")}>
          <div id="bookings" className="hostsidebar-page">
            Bookings
          </div>
        </Link>
        <Link to="/host/avalibility" onClick={() => selectPage("availability")}>
          <div id="availability" className="hostsidebar-page">
            Price and Availability
          </div>
        </Link>
        <Link to="/host/analytics" onClick={() => selectPage("analytics")}>
          <div id="analytics" className="hostsidebar-page">
            Analytics
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HostSidebar;
