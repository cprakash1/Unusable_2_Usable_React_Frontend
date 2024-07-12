import React, { useContext, useEffect } from "react";
import Register from "../components/Register";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

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
    <>
      <Register />
    </>
  );
};

export default RegisterPage;
