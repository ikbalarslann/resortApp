import "./scss/productCard.scss";
import { setSCproperties } from "../../slices/properties/SCproperties";
import { removeProperty } from "../../slices/properties/WLproperties";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ProductCard = (object) => {
  const property = object.property;

  const dispatch = useDispatch();
  const { SCproperties } = useSelector((state) => state.SCproperties);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCardClick = async () => {
    setIsAddedToCart(true);
    dispatch(setSCproperties([...SCproperties, property]));
    dispatch(removeProperty(property._id));
  };

  return (
    <div className="product-card">
      <p className="product-card__text">
        Access to the family-friendly Paradise Pool.
      </p>
      <ul className="product-card__features">
        <li className="product-card__text">
          Paradise pool complex: 3 outdoor pools kept at 82-84 degrees
        </li>
        <li className="product-card__text">
          3 twist tower waterslides (two 45ft tube slides and one 65ft drop
          slide)
        </li>
        <li className="product-card__text">Splash pad for kids</li>
        <li className="product-card__text">Swim-up bar</li>
        <li className="product-card__text">
          Lounge chairs (first come, first serve)
        </li>
        <li className="product-card__text">Towel service</li>
        <li className="product-card__text">
          Poolside food and drink service from Paradise Pool Bar
        </li>
        <li className="product-card__text">
          Resort retail and dining access: Arizona Biltmore Shops, Spire Bar,
          Wright Bar, Renata’s Hearth and McArthur’s Restaurant & Bar
        </li>
        <li className="product-card__text">Complimentary wifi</li>
        <li className="product-card__text">Complimentary valet parking</li>
      </ul>
      <p className="product-card__text">
        Does not include access to the adult-only Saguaro Pool. No outside food
        & beverages allowed.
      </p>
      <div className="product-card__text">
        <p>price for a day = ${property.availability[0].pricePerNight}</p>

        {isAddedToCart ? (
          "Added to cart"
        ) : (
          <button
            className="product-card__button"
            onClick={handleAddToCardClick}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
