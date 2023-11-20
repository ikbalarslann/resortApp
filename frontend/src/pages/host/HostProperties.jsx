import React, { useState, useEffect } from "react";
import "./scss/hostProperties.scss";
import MyCard from "../../components/cards/MyCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HostProperties = () => {
  const [properties, setProperties] = useState([]);

  const { hostInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <div className="hostProperties">
      <Link to="/host/create">
        <button className="hostProperties__button">Create Property</button>
      </Link>

      {properties
        .filter((property) => property.hostId === hostInfo?._id)
        .map((property, index) => (
          <MyCard property={property} key={index} />
        ))}
    </div>
  );
};

export default HostProperties;
