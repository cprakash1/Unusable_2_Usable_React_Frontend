import React from "react";

const Register1 = () => {
  return (
    <div>
      <h1>Register</h1>
      <form
        action="/register"
        method="post"
        className="needs-validation"
        novalidate
      >
        <div className="mb-3">
          <label for="pin" className="form-label">
            Email Verification Pin
          </label>
          <input type="pin" name="pin" id="pin" className="form-control" required />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label ">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button className="btn btn-success" id="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register1;
