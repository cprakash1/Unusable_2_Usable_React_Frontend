import React from "react";
import Navbar from "../components/Navbar";
import UFooter from "../components/Ufooter";
import Home from "../components/Home";
import Mapbox from "../components/Mapbox";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Mapbox />
      <Home />
      <UFooter />
    </div>
  );
};

export default HomePage;
