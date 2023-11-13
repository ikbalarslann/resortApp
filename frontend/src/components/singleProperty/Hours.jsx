import "./scss/hours.scss";

const Hours = () => {
  return (
    <div className="hours">
      <h1 className="hours__title">Hours</h1>

      <div className="hours__section">
        <h3 className="hours__subtitle">Pools</h3>
        <p className="hours__time">10.00am - 8.00pm</p>
      </div>

      <div className="hours__section">
        <h3 className="hours__subtitle">Poolside Food & Drink Service</h3>
        <p className="hours__time">Sunday - Saturday 11.00am - 5.00pm</p>
      </div>
    </div>
  );
};

export default Hours;
