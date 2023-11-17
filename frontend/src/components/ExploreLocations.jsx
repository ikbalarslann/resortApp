import image1 from "../assets/img/exploreLocations/1.jpeg";
import image2 from "../assets/img/exploreLocations/2.jpeg";
import image3 from "../assets/img/exploreLocations/3.jpeg";
import image4 from "../assets/img/exploreLocations/4.jpeg";
import image5 from "../assets/img/exploreLocations/5.jpeg";
import image6 from "../assets/img/exploreLocations/6.jpeg";

import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../slices/searchbars/locationSlice";
import { setDate } from "../slices/searchbars/dateSlice";

import { useNavigate } from "react-router-dom";

import "./scss/exploreLocations.scss";

const ExploreLocations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const data = [
    {
      title: "new york",
      img: image1,
    },
    {
      title: "los angeles",
      img: image2,
    },
    {
      title: "san francisco",
      img: image3,
    },
    {
      title: "chicago",
      img: image4,
    },
    {
      title: "miami",
      img: image5,
    },
    {
      title: "boston",
      img: image6,
    },
  ];

  const handleOnClick = async (location) => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    dispatch(setLocation(location));
    dispatch(setDate(formattedDate));

    userInfo ? navigate("/user/properties") : navigate("/properties");
  };

  return (
    <div className="exploreLocation">
      <h1>Explore Locations</h1>

      <div className="exploreLocation__cards">
        {data.map((element, index) => {
          return (
            <div
              className="exploreLocation__cards-card"
              style={{ backgroundImage: `url(${element.img})` }}
              onClick={() => {
                handleOnClick(element.title);
              }}
              key={index}
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
