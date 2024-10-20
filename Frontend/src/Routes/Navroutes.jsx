import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Buy from "../Pages/Buy";
import Rent from "../Pages/Rent";
import Favourites from "../Pages/Favourites";
import Contactus from "../Pages/Contactus";
import PropertyDetails from "../Pages/PropertyDetails";
import Commercial from "../Pages/Commercial";

const Navroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/rent" element={<Rent />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/contact-us" element={<Contactus />} />
      <Route path="/commercial" element={<Commercial />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
};

export default Navroutes;
