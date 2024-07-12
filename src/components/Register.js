import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Register = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [registerToken, setRegisterToken] = useState("");
  const { getRegisterToken, register } = useContext(GlobalContext);

  return (
    <div className="container">
      <h1>Register</h1>
      <form
        action="/register1"
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
            disabled={otpSent}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control mb-2"
            disabled={otpSent}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button
          className="btn btn-success"
          disabled={otpSent}
          onClick={async (e) => {
            e.preventDefault();
            setRegisterToken(await getRegisterToken({ username, email }));
            setOtpSent(true);
          }}
        >
          Verify Email
        </button>
        <br />
        <br />
        <div className="mb-3">
          <label htmlFor="pin" className="form-label">
            Email Verification Pin
          </label>
          <input
            type="pin"
            name="pin"
            id="pin"
            className="form-control"
            disabled={!otpSent}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label ">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            disabled={!otpSent}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button
          className="btn btn-success"
          disabled={!otpSent}
          id="submit"
          onClick={async (e) => {
            e.preventDefault();
            await register({ pin, password, registerToken });
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
