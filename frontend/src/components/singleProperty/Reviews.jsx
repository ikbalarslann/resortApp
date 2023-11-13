import "./scss/reviews.scss";

const Reviews = (object) => {
  const property = object.property;
  return (
    <div className="reviews">
      <h1 className="reviews__title">Reviews</h1>
      <p className="reviews__title">{property.reviews.length} reviews</p>
      {property.reviews.map((review, index) => (
        <div key={index} className="reviews__review">
          <h6 className="reviews__review__rating">{review.rating} star</h6>
          <p className="reviews__review__text">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
