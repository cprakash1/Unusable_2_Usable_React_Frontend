import React, { useContext, useEffect } from "react";
import Login from "../components/Login";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

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
    <>
      <Login />
    </>
  );
};

export default LoginPage;
