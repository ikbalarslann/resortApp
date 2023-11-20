import "./scss/hostMobileLayout.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHProperties } from "../slices/properties/HpropertiesSlice";
import { setDate } from "../slices/searchbars/dateSlice";
import { setProperties } from "../slices/properties/propertiesSlice";
import { setLocation } from "../slices/searchbars/locationSlice";

//import "../scss/hostSidebar.scss";

const HostMobileLayout = () => {
  const [properties, setProperties] = useState([]);
  const [checkedCheckbox, setCheckedCheckbox] = useState(null);
  const { Hproperties } = useSelector((state) => state.Hproperties);
  const { hostInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogoClick = () => {
    handleToggleClick();
    dispatch(setDate(null));
    dispatch(setProperties({ properties: [] }));
    dispatch(setLocation(null));
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;

    handleToggleClick();
    handlePropertiesClick();

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

  const handleToggleClick = () => {
    const nav = document.querySelector(".hostMobileLayout__links");

    nav.classList.toggle("hide");
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

  const handlePropertiesClick = () => {
    const _properties = document.querySelector(".hostMobileLayout__properties");

    _properties.classList.toggle("hide");
  };

  return (
    <div className="hostMobileLayout">
      <div className="hostMobileLayout__toggle-parent">
        <h1>
          <Link
            to="/host"
            onClick={handleLogoClick}
            className="hostMobileLayout__logo"
          >
            Resort
          </Link>
        </h1>

        <div className="hostMobileLayout__toggle" onClick={handleToggleClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="hostMobileLayout__links hide">
        <div className="hostsidebar__category">
          <h6 className="hostsidebar-header" onClick={handlePropertiesClick}>
            {Hproperties.length === 1 ? Hproperties[0].title : "All Properties"}
          </h6>
          <div className="hostMobileLayout__properties hide">
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
        </div>
        <div className="hostsidebar__category">
          <Link
            to="/host/bookings"
            onClick={() => {
              selectPage("bookings");
              handleToggleClick();
            }}
          >
            <div id="bookings" className="hostsidebar-page">
              Bookings
            </div>
          </Link>
          <Link
            to="/host/avalibility"
            onClick={() => {
              selectPage("availability");
              handleToggleClick();
            }}
          >
            <div id="availability" className="hostsidebar-page">
              Price and Availability
            </div>
          </Link>
          <Link
            to="/host/analytics"
            onClick={() => {
              selectPage("analytics");
              handleToggleClick();
            }}
          >
            <div id="analytics" className="hostsidebar-page">
              Analytics
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostMobileLayout;
