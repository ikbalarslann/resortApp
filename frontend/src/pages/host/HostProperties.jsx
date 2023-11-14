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

      <div className="hostProperties__container">
        <div className="hostProperties__container__row">
          {properties
            .filter((property) => property.hostId === hostInfo?._id)
            .map((property) => (
              <div
                key={property._id}
                className="hostProperties__container__col"
              >
                <MyCard property={property} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HostProperties;
