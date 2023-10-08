import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, setUserFromAccessToken } = useContext(GlobalContext);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      // window.location.href = "/items";
      setUserFromAccessToken();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container" style={{ height: "100vh" }}>
      <h1>Login</h1>
      <form
        action="/login"
        method="post"
        className="needs-validation"
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button
          className="btn btn-success btn-lg"
          onClick={async (e) => {
            e.preventDefault();
            await login({ username, password });
            setPassword("");
            setUsername("");
          }}
        >
          Login
        </button>
        <Link to="/forgotpassword" className="mx-auto btn btn-primary btn-sm">
          forgotpassword
        </Link>
      </form>
    </div>
  );
};

export default Login;
