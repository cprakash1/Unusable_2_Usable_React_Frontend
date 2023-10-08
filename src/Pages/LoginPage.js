import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import UFooter from "../components/Ufooter";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import Flash from "../components/Flash";

const LoginPage = () => {
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
      <Login />
      <UFooter />
    </div>
  );
};

export default LoginPage;
