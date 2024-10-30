import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Buy from "../Pages/Buy";
import Rent from "../Pages/Rent";

import Contactus from "../Pages/Contactus";
import PropertyDetails from "../Pages/PropertyDetails";
import Sell from "../Pages/Sell";
import Pricing from "../Pages/Pricing";
const Navroutes = ({
  data,
  setData,
  loggedIn,
  properties,
  loading,
  refreshProperties,
}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/buy"
        element={<Buy properties={properties} loading={loading} />}
      />
      <Route
        path="/rent"
        element={<Rent properties={properties} loading={loading} />}
      />
      <Route path="/contact-us" element={<Contactus />} />
      <Route
        path="/sell"
        element={<Sell refreshProperties={refreshProperties} />}
      />
      <Route
        path="/property/:id"
        element={<PropertyDetails properties={properties} />}
      />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
};

export default Navroutes;
