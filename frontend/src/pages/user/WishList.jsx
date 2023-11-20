import React from "react";
import AddCard from "../../components/cards/AddCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./scss/wishList.scss";

const WishList = () => {
  const WLproperties = useSelector((state) => state.WLproperties);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wishlist">
      <h1>WishList</h1>
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
