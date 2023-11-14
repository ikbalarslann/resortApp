import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./scss/analytics.scss";

const Analytics = () => {
  const [properties, setProperties] = useState([]);

  const { hostInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch properties data here and update state
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <div className="analyticsPage">
      <Link to="/host/analytics">
        <button className="analyticsPage-button">All</button>
      </Link>
      <div className="analyticsPage-row">
        {properties
          .filter((property) => property.hostId === hostInfo?._id)
          .map((property) => (
            <div key={property._id} className="analyticsPage-row__col">
              <div className="analyticsPage-row__col-card ">
                <Link to={`/host/analytics/${property._id}`}>
                  <div className="card-body">
                    <div className="card-title">{property.title}</div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Analytics;
