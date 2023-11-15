import React from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import ExploreLocations from "../components/ExploreLocations";

const Home = () => {
  return (
    <>
      <Banner />
      <SearchBar />
      <Slider />
      <ExploreLocations />
    </>
  );
};

export default Home;
