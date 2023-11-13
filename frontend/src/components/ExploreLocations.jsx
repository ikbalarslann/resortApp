import image1 from "../assets/img/exploreLocations/1.jpeg";
import image2 from "../assets/img/exploreLocations/2.jpeg";
import image3 from "../assets/img/exploreLocations/3.jpeg";
import image4 from "../assets/img/exploreLocations/4.jpeg";
import image5 from "../assets/img/exploreLocations/5.jpeg";
import image6 from "../assets/img/exploreLocations/6.jpeg";

import "./scss/exploreLocations.scss";

const ExploreLocations = () => {
  const data = [
    {
      title: "New York",
      img: image1,
    },
    {
      title: "Los Angeles",
      img: image2,
    },
    {
      title: "San Francisco",
      img: image3,
    },
    {
      title: "Chicago",
      img: image4,
    },
    {
      title: "Miami",
      img: image5,
    },
    {
      title: "Boston",
      img: image6,
    },
  ];

  return (
    <div className="exploreLocation">
      <h1>Explore Locations</h1>

      <div className="exploreLocation__cards">
        {data.map((element) => {
          return (
            <div
              className="exploreLocation__cards-card"
              style={{ backgroundImage: `url(${element.img})` }}
              key={element.title}
            >
              <p>Explore</p>
              <h2>{element.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreLocations;
