import React from "react";
import "./error.css";
import Error404_Picture from "../../assets/images/error404.png";
import { BiError } from "react-icons/bi";

const Error404 = () => {
  return (
    <div className="errorPage">
      <div className="errorSection">
        <div className="error">
          <img src={Error404_Picture} alt="" className="picture" />
          <div className="text-error">
            <BiError className="error-icon" />
            <h1 className="bigtxt-error">Sorry! Something went wrong</h1>
            <p className="smalltxt-error">
              Lorem ipsum dolor sit amet, conse ctetur adipiscing elit. Luctus
              vel arcu, tellus tincidunt at sagittis cursus.
            </p>
            <div className="btn-page">
              <button className="btn">Try again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
