import React from "react";
import AddCard from "../../components/cards/AddCard";
import { useSelector } from "react-redux";
import "./scss/property.scss";
import Sidebar from "../../components/Sidebar";

const Property = () => {
  const { Sproperties } = useSelector((state) => state.Sproperties);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="property">
      <Sidebar />
      <div className="property__row">
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
