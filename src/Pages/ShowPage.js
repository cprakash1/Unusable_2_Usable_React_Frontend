import React from "react";
import Navbar from "../components/Navbar";
import UFooter from "../components/Ufooter";
import Show from "../components/Show";

const ShowPage = () => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <Show />
      <UFooter />
    </div>
  );
};

export default ShowPage;
