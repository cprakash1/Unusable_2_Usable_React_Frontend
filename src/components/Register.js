import React from "react";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <form
        action="/register1"
        method="post"
        className="needs-validation"
        novalidate
      >
        <div className="mb-3">
          <label for="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control mb-2"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button className="btn btn-success">Verify Email</button>
      </form>
    </div>
  );
};

export default Register;
