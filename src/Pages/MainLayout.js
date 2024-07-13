import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import UFooter from "../components/Ufooter";
import Flash from "../components/Flash";
import { GlobalContext } from "../context/GlobalState";
import Loading from "../components/Loading";

const MainLayout = () => {
  const { loading } = useContext(GlobalContext);

  return (
    <div>
      <Navbar />
      <Flash />
      <div
        style={{
          padding: "20px",
          minHeight: "calc(100vh - 112px)",
          backgroundColor: "#f9f9f9",
        }}
      >
        {loading && <Loading />}
        <Outlet />
      </div>
      <UFooter />
    </div>
  );
};

export default MainLayout;
