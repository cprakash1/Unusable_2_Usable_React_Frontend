import React from "react";
import Navbar from "../components/Navbar";
import UFooter from "../components/Ufooter";
import Show from "../components/Show";
import Flash from "../components/Flash";

const ShowPage = () => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <Flash />
      <Show />
      <UFooter />
    </div>
  );
};

export default ShowPage;
