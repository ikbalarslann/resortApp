import React from "react";
import AddCard from "../../components/cards/AddCard";
import { useSelector, useDispatch } from "react-redux";
import "./scss/property.scss";
import Sidebar from "../../components/Sidebar";
import Searchbar from "../../components/SearchBar";
import { setSProperties } from "../../slices/properties/SpropertiesSlice";
import { format } from "date-fns";
import { useEffect } from "react";

const Property = () => {
  const { Sproperties } = useSelector((state) => state.Sproperties);
  const { userInfo } = useSelector((state) => state.auth);

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

  return (
    <div className="property">
      <Sidebar />
      <div className="property__row">
        <Searchbar />
        {Sproperties.map((property) => (
          <div key={property._id} className="property__row-col">
            <AddCard property={property} userId={userInfo._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
