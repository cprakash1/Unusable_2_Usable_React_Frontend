import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import Flash from "../components/Flash";

const MainPage = () => {
  const { user } = useContext(GlobalContext);
  return (
    <div>
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-left mb-0">Unusable2Usable</h3>
            <nav className="nav nav-masthead justify-content-center float-md-right">
              <Link className="nav-link active" aria-current="page" to="">
                Home
              </Link>
              <Link className="nav-link" to="/items">
                Items
              </Link>
              {user ? (
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <Flash />
        <main className="px-3">
          <h1>Unusable2Usable</h1>
          <br />
          <br />
          <p className="lead mx-5">
            {" "}
            Welcome Users! <br />
            <br /> Welcome to Unusable2Usable, where unusable items find new
            purpose! Sell your unwanted belongings and give others the chance to
            transform them into treasures. Discover a wide array of unique,
            repurposable items from our vibrant community. Our user-friendly
            interface ensures a seamless experience, with secure transactions
            and buyer/seller protection. Join us in promoting sustainability by
            reducing waste and embracing creativity. Unleash your imagination as
            you explore limitless possibilities. Find hidden gems and breathe
            new life into forgotten objects. Together, we can make a difference,
            one upcycled creation at a time. Join Unusable2Usable today and be
            part of a community that celebrates the power of transformation
          </p>
          <br />
          <br />
          <Link
            to="/items"
            className="btn btn-lg btn-secondary font-weight-bold border-white"
          >
            View Items
          </Link>
        </main>

        <footer className="mt-auto text-white-50">
          <p>&copy; 2023 </p>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;
