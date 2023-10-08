import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Navbar = () => {
  const { user } = useContext(GlobalContext);
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Unusable2Usable
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/items">
                All Items
              </Link>
              <Link className="nav-link" to="/items/new">
                Add Item
              </Link>
            </div>
            <div className="navbar-nav ms-auto">
              {!user ? (
                <>
                  <Link className="nav-link" to="/login">
                    LogIn
                  </Link>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </>
              ) : (
                <Link className="nav-link" to="/logout">
                  LogOut
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
