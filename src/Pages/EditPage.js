import React from "react";
import Navbar from "../components/Navbar";
import Edit from "../components/Edit";
import UFooter from "../components/Ufooter";
import Flash from "../components/Flash";

const EditPage = () => {
  return (
    <div>
      <Navbar />
      <Flash />
      <Edit />
      <UFooter />
    </div>
  );
};

export default EditPage;
