import React from "react";
import AddCard from "../../components/cards/AddCard";
import { useSelector } from "react-redux";
import "./scss/property.scss";
import Sidebar from "../../components/Sidebar";

const Property = () => {
  const Reduxproperties = useSelector((state) => state.properties);
  const { userInfo } = useSelector((state) => state.auth);
  const { date } = useSelector((state) => state.date);

  return (
    <div className="property">
      <Sidebar />
      <div className="property__row">
        {Reduxproperties.properties.map((property) => (
          <div key={property._id} className="property__row-col">
            <AddCard property={property} userId={userInfo._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
