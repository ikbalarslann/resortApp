import Slider from "../../components/Slider";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./scss/singleProperty.scss";

import ProductCard from "../../components/singleProperty/ProductCard";
import Hours from "../../components/singleProperty/Hours";
import HowItWorks from "../../components/singleProperty/HowItWorks";
import CancelPolicy from "../../components/singleProperty/CancelPolicy";
import Reviews from "../../components/singleProperty/Reviews";

import { setWLproperties } from "../../slices/properties/WLproperties";
import { useDispatch, useSelector } from "react-redux";

const SingleProperty = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { WLproperties } = useSelector((state) => state.WLproperties);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyId]);

  if (loading) {
    return <p>Loading...</p>; // Add a loading indicator
  }

  if (error) {
    return <p>{error}</p>; // Display an error message
  }

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

  const handleAddToWishListClick = async () => {
    console.log("add to wish list");
    dispatch(setWLproperties([...WLproperties, property]));
  };

  return (
    <div>
      <Slider />
      <div className="sProperty">
        <div className="sProperty__header">
          <h5 className="sProperty__item">{property.title}</h5>
          <p className="sProperty__item">
            {averageReview()}/5 - {property.reviews.length} reviews
          </p>
        </div>
        <button
          className="sProperty__wishlist-button"
          onClick={handleAddToWishListClick}
        >
          Add to Wishlist
        </button>
        <p className="sProperty__item">{property.type}</p>
        <p className="sProperty__item">{property.description}</p>

        <ProductCard property={property} />
        <Hours />
        <HowItWorks />
        <CancelPolicy />
        <Reviews property={property} />
      </div>
    </div>
  );
};

export default SingleProperty;
