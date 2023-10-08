import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import UFooter from "../components/Ufooter";
import Register from "../components/Register";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import Flash from "../components/Flash";

const RegisterPage = () => {
  const { user, setSuccess } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      setSuccess("You are already logged in!");
      navigate("/items");
    }
  }, [user]);
  return (
    <div>
      <Navbar />
      <Flash />
      <Register />
      <UFooter />
    </div>
  );
};

export default RegisterPage;
