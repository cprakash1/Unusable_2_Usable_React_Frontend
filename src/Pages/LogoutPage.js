import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(GlobalContext);
  useEffect(() => {
    logout();
    navigate("/");
  }, []);
};

export default LogoutPage;
