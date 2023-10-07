import React from "react";

const ChangePassword = () => {
  return (
    <div>
      <h1>Please enter new Password !</h1>
      <form
        action="/changePassword"
        method="post"
        className="needs-validation"
        novalidate
      >
        <div className="mb-3">
          <label for="pin" className="form-label">
            PIN
          </label>
          <input
            type="text"
            name="pin"
            id="pin"
            className="form-control"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label for="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="text"
            name="newPassword"
            id="newPassword"
            className="form-control"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label for="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button className="btn btn-success btn-lg">changePassword</button>
        {/* <!-- <a href="/forgotpassword" className="mx-auto btn btn-primary btn-sm">forgotpassword</a> --> */}
      </form>
    </div>
  );
};

export default ChangePassword;
