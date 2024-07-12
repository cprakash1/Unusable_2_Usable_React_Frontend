import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [forgetPasswordTokenValue, setForgetPasswordTokenValue] = useState("");

  const { forgotPasswordToken, forgotPassword, user, setSuccess } =
    useContext(GlobalContext);

  useEffect(() => {
    if (user) {
      setSuccess("You are already logged in!");
      navigate("/items");
    }
  }, [user]);

  return (
    <div className="container mt-2">
      <h1>ForgotPassword</h1>
      <form
        action="/forgotpassword"
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
            disabled={sentOtp}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button
          className="btn btn-success"
          disabled={sentOtp}
          onClick={async (e) => {
            e.preventDefault();
            setForgetPasswordTokenValue(
              await forgotPasswordToken({ username })
            );
            setSentOtp(true);
          }}
        >
          Send OTP
        </button>
        <br />
        <br />
        <div className="mb-3">
          <label htmlFor="pin" className="form-label">
            PIN
          </label>
          <input
            type="text"
            name="pin"
            id="pin"
            className="form-control"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            disabled={!sentOtp}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="text"
            name="newPassword"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!sentOtp}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!sentOtp}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button
          className="btn btn-success btn-lg"
          disabled={!sentOtp}
          onClick={async (e) => {
            e.preventDefault();
            if (newPassword !== confirmPassword) {
              alert("Password and Confirm Password should be same");
              return;
            }
            await forgotPassword({
              forgotPasswordToken: forgetPasswordTokenValue,
              pin,
              password: newPassword,
            });
          }}
        >
          changePassword
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
