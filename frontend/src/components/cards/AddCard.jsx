import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWLproperties } from "../../slices/properties/WLproperties";
import { useNavigate } from "react-router-dom";
import "./scss/addCard.scss";

const AddCard = ({ property, isShowWishList = true }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { WLproperties } = useSelector((state) => state.WLproperties);
  const { date } = useSelector((state) => state.date);

  const handleAddToWishListClick = async () => {
    console.log("add to wish list");
    dispatch(setWLproperties([...WLproperties, property]));
  };

  const averageReview = () => {
    if (property.reviews.length === 0) return 0;

    let sum = 0;
    for (let i = 0; i < property.reviews.length; i++) {
      sum += property.reviews[i].rating;
    }

    const avg = sum / property.reviews.length;

    const roundedAvg = Math.round(avg * 2) / 2;

    return roundedAvg.toFixed(1);
  };

  const handleViewClick = async () => {
    navigate(`/user/properties/${property._id}`);
  };

  return (
    <div className="addCard">
      <img className="addCard__img" src={property.images[0]} alt="property" />

      <div className="addCard__content">
        <p className="addCard__content__text">{property.location}</p>
        <p className="addCard__content__text">date : {date}</p>
        <h5 className="addCard__content__title">{property.title}</h5>
        <p className="addCard__content__text">
          {averageReview()}/5 - {property.reviews.length} reviews
        </p>
        <p className="addCard__content__text">{property.type}</p>

        <p className="addCard__content__text">
          Description: {property.description}
        </p>

        <p className="addCard__content__text">
          Space: {property.availability.map((e) => e.availableSpaces)}
        </p>
        <p className="addCard__content__title">
          Price: {property.availability.map((e) => e.pricePerNight)}
        </p>
        <div className="addCard__content-button-group">
          {isShowWishList && (
            <button
              className="addCard__content-button"
              onClick={handleAddToWishListClick}
            >
              Add to Wish List
            </button>
          )}
          <button className="addCard__content-button" onClick={handleViewClick}>
            view
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
