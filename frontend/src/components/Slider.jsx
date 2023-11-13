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

  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={3}
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
  );
};

export default Slider;
