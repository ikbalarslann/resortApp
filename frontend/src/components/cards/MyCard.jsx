import React from "react";
import { Link } from "react-router-dom";
import "./scss/myCard.scss";

const MyCard = ({ property }) => {
  return (
    <div className="myCard">
      <div className="myCard__body">
        <h2 className="myCard__title">{property.title}</h2>
        <p className="myCard__subtitle">Host ID: {property.hostId}</p>
        <p className="myCard__text">{property.description}</p>
        <p className="myCard__text">Location: {property.location}</p>
        <p className="myCard__text">Price: ${property.price}</p>
        <p className="myCard__text">
          Available Space: {property.avaliableSpace}
        </p>
        <Link to={`/host/edit/${property._id}`}>
          <button className="myCard__button">Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default MyCard;
