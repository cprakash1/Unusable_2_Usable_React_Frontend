import React from "react";
import Navbar from "../components/Navbar";
import New from "../components/New";
import UFooter from "../components/Ufooter";
import Flash from "../components/Flash";

const NewPage = () => {
  return (
    <div>
      <Navbar />
      <Flash />
      <New />
      <UFooter />
    </div>
  );
};

export default NewPage;
