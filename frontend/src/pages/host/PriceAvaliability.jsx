import React, { useState, useEffect } from "react";
import "./scss/priceAvaliability.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PriceAvaliability = () => {
  const [properties, setProperties] = useState([]);

  const { hostInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <div className="PandA">
      {properties
        .filter((property) => property.hostId === hostInfo?._id)
        .map((property, index) => (
          <div className="PandA__card" key={index}>
            <Link to={`/host/avalibility/${property._id}`}>
              <div className="PandA__card-title">{property.title}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PriceAvaliability;
