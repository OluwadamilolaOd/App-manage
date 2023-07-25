import React from "react";
import "./error.css";
import { BiError } from "react-icons/bi";

const Error500 = () => {
  return (
    <div className="error_Section">
      <div className="error">
        <div className="text-error">
          <BiError className="error-icon-red" />
          <h1>Sorry! Something went wrong</h1>
        </div>
        <div className="btn-page">
          <button className="btnRed" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error500;
