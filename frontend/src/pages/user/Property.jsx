import React from "react";
import AddCard from "../../components/cards/AddCard";
import { useSelector, useDispatch } from "react-redux";
import "./scss/property.scss";
import Sidebar from "../../components/Sidebar";
import Searchbar from "../../components/SearchBar";
import { setSProperties } from "../../slices/properties/SpropertiesSlice";
import { setProperties } from "../../slices/properties/propertiesSlice";
import { format } from "date-fns";
import { useEffect } from "react";

const Property = () => {
  const { Sproperties } = useSelector((state) => state.Sproperties);

  const { date } = useSelector((state) => state.date);
  const { location } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/properties");
        if (response.ok) {
          const data = await response.json();

          const filteredProperties = await data
            .map((property) => ({
              ...property,
              availability: property.availability
                .map((element) => ({
                  ...element,
                  date: format(new Date(element.date), "yyyy-MM-dd"),
                }))
                .filter((element) => element.date === date),
            }))
            .filter((property) => property.location.toLowerCase() === location);

          dispatch(setProperties(filteredProperties));
          dispatch(setSProperties(filteredProperties));
        } else {
          console.error(
            "Failed to fetch property data. Status: " + response.status
          );
        }
      } catch (error) {
        console.error("Error while fetching property data:", error);
        throw error;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 760) {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.add("hide");
      } else {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.remove("hide");
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterClick = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("hide");
    console.log(sidebar);
  };

  return (
    <div className="property">
      <div className="property__filter" onClick={handleFilterClick}>
        Filter Properties
      </div>
      <Sidebar />
      <div className="property__row">
        <Searchbar />
        {Sproperties.map((property) => (
          <div key={property._id} className="property__row-col">
            <AddCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
