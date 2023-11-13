import React from "react";
import AddCard from "../../components/cards/AddCard";
import "./scss/property.scss";
import { useSelector } from "react-redux";

const WishList = () => {
  const WLproperties = useSelector((state) => state.WLproperties);

  return (
    <div className="wishlist">
      <div className="wishlist__row">
        {WLproperties.WLproperties.map((property, index) => (
          <div className="wishlist__row-col" key={index}>
            <AddCard property={property} isShowWishList={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
