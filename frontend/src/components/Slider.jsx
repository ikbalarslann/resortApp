import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../node_modules/swiper/swiper-bundle.css";

import "./scss/slider.scss";
import image1 from "../assets/img/slider/1.jpeg";
import image2 from "../assets/img/slider/2.jpeg";
import image3 from "../assets/img/slider/3.jpeg";
import image4 from "../assets/img/slider/4.jpeg";
import image5 from "../assets/img/slider/5.jpeg";
import image6 from "../assets/img/slider/6.jpeg";
import image7 from "../assets/img/slider/7.jpeg";
import image8 from "../assets/img/slider/8.jpeg";
import image9 from "../assets/img/slider/9.jpeg";
import image10 from "../assets/img/slider/10.jpeg";

const Slider = () => {
  const data = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slice, setSlice] = useState(3);

  useEffect(() => {
    // Event listener callback
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 800) {
      setSlice(1);
    } else setSlice(3);
  });

  return (
    <div>
      <Swiper
        spaceBetween={5}
        slidesPerView={slice}
        className="slider"
        loop={true}
        navigation={true}
      >
        {data.map((element) => {
          return (
            <SwiperSlide key={element} className="slider__page">
              <img src={element} alt="slider" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Slider;
