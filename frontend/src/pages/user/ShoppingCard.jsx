import React from "react";
import BookCard from "../../components/cards/BookCard";
import { useSelector } from "react-redux";
import "./scss/shoppingCard.scss";
import { useEffect } from "react";

const ShoppingCard = () => {
  const SCproperties = useSelector((state) => state.SCproperties.SCproperties);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shoppingCard">
      <h1>Shopping Card</h1>
      <div className="shoppingCard__row">
        {SCproperties.map((property, index) => (
          <div key={index} className="shoppingCard__row-col">
            <BookCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCard;
