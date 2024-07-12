import React, { useState } from "react";
import Home from "../components/Home";
import Mapbox from "../components/Mapbox";

const HomePage = () => {
  const [filteredCampgrounds, setFilteredCampgrounds] = useState([]);

  return (
    <>
      <Mapbox
        filteredCampgrounds={filteredCampgrounds}
        setFilteredCampgrounds={setFilteredCampgrounds}
      />
      <Home
        filteredCampgrounds={filteredCampgrounds}
        setFilteredCampgrounds={setFilteredCampgrounds}
      />
    </>
  );
};

export default HomePage;
