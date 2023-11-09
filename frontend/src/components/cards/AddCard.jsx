import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSCproperties } from "../../slices/properties/SCproperties";
import { setWLproperties } from "../../slices/properties/WLproperties";
import { removeProperty } from "../../slices/properties/WLproperties";
import { useState } from "react";
import "./scss/addCard.scss";

const AddCard = ({ property, date, isShowWishList = true }) => {
  const dispatch = useDispatch();
  const { SCproperties } = useSelector((state) => state.SCproperties);
  const { WLproperties } = useSelector((state) => state.WLproperties);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCardClick = async () => {
    setIsAddedToCart(true);
    dispatch(setSCproperties([...SCproperties, property]));
    dispatch(removeProperty(property._id));
  };

  const handleAddToWishListClick = async () => {
    console.log("add to wish list");
    dispatch(setWLproperties([...WLproperties, property]));
  };

  return (
    <div className="addCard">
      <div className="addCard__body">
        <h5 className="addCard__title">{property.title}</h5>
        <p className="addCard__text">Description: {property.description}</p>
        <p className="addCard__text">Location: {property.location}</p>
        <p className="addCard__text">Date: {date}</p>
        <p className="addCard__text">
          Space: {property.availability.map((e) => e.availableSpaces)}
        </p>
        <p className="card__text">
          Price: {property.availability.map((e) => e.pricePerNight)}
        </p>
        {isAddedToCart ? (
          "Added to cart"
        ) : (
          <button
            className="addCard-button"
            onClick={handleAddToCardClick}
            disabled={property.avaliableSpace <= 0}
          >
            Add to cart
          </button>
        )}
        {isShowWishList && (
          <button
            className="addCard-button"
            onClick={handleAddToWishListClick}
            disabled={property.avaliableSpace <= 0}
          >
            Add to Wish List
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCard;
