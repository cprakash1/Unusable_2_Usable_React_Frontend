import React from "react";
import Navbar from "../components/Navbar";
import Ufooter from "../components/Ufooter";
import ForgotPassword from "../components/ForgotPassword";
import Flash from "../components/Flash";

const ForgotPasswordPage = () => {
  return (
    <div>
      <Navbar />
      <Flash />
      <ForgotPassword />
      <Ufooter />
    </div>
  );
};

export default ForgotPasswordPage;
