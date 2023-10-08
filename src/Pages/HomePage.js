import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UFooter from "../components/Ufooter";
import Home from "../components/Home";
import Mapbox from "../components/Mapbox";
import Flash from "../components/Flash";

const HomePage = () => {
  const [filteredCampgrounds, setFilteredCampgrounds] = useState([]);

  return (
    <div>
      <Navbar />
      <Flash />
      <Mapbox
        filteredCampgrounds={filteredCampgrounds}
        setFilteredCampgrounds={setFilteredCampgrounds}
      />
      <Home
        filteredCampgrounds={filteredCampgrounds}
        setFilteredCampgrounds={setFilteredCampgrounds}
      />
      <UFooter />
    </div>
  );
};

export default HomePage;
