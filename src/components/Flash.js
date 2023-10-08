import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Flash = () => {
  const { success, error, deleteError, deleteSuccess } =
    useContext(GlobalContext);
  setTimeout(() => {
    deleteError();
    deleteSuccess();
  }, 10000);
  return (
    <div style={{ margin: "0px" }}>
      {success && success.length !== 0 ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          style={{ margin: "0px" }}
        >
          {success}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            style={{ margin: "0px" }}
          ></button>
        </div>
      ) : null}
      {error && error.length !== 0 ? (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
          style={{ margin: "0px" }}
        >
          {error}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            style={{ margin: "0px" }}
          ></button>
        </div>
      ) : null}
    </div>
  );
};

export default Flash;
