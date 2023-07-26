import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Auth/authConfig";
import "./Styles/landingPage.css";
import Picture from "../assets/images/landing_pg_img.png";

const LandingPage = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "/",
      })
      .catch((error) => console.log(error));
  };

  //Get current Year
  const year = new Date().getFullYear();
  return (
    <div className="landingPage">
      <div className="img-page">
        <img src={Picture} alt="" className="picture" />
      </div>
      <div className="text-page-container">
        <div className="container-one">
          <div>
            <h1 className="big-title"> Havis 360 Unified License</h1>
            <p>A Unified License Solution</p>
          </div>
          <div className="btn-page">
            <button className="btn-white-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
        <div className="text-bottom">
          <p>© Ha-Shem Limited {year}. All Rights Reserved.</p>
          <p>
            Powered by{""}
            <span className="text-link">
              <a
                href="https://havis360.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Havis 360
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
