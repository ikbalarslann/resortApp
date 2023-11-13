import "./scss/howItWorks.scss";

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h1 className="how-it-works__title">How It Works</h1>
      <ol className="how-it-works__steps">
        <li className="how-it-works__steps__step">
          Select an available day in the calendar, the number of guests, and
          complete booking
        </li>
        <li className="how-it-works__steps__step">
          Receive booking confirmation with details and instructions
        </li>
        <li className="how-it-works__steps__step">
          Bring valid photo ID and check-in at the For pools and Legendary
          Tours: Bring a valid photo ID to the Concierge Desk in the lobby of
          the hotel. You will be provided with a wristband and pool access key.
          For spa pass and Sol Sunday: Bring a valid photo ID to the Tierra Luna
          Reception Desk
        </li>
        <li className="how-it-works__steps__step">Enjoy your pool day</li>
      </ol>
    </div>
  );
};

export default HowItWorks;
