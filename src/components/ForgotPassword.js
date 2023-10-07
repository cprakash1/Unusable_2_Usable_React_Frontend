import React from "react";

const ForgotPassword = () => {
  return (
    <div>
      <h1>ForgotPassword</h1>
      <form
        action="/forgotpassword"
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
        <button className="btn btn-success">ForgotPassword</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
