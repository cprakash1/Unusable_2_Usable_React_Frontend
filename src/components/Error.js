import React from "react";

const Error = () => {
  const err = {};
  return (
    <div>
      <div className="row">
        <div className="col-6 offset-3">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">
              {err.message} ( {err.statusCode} )
            </h4>
            {process.env.NODE_ENV !== "production" ? <p>{err.stack}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
