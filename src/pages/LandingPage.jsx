import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Auth/authConfig";
import "./Styles/landingPage.css";
import Picture from "../assets/images/landing-page.png";

const LandingPage = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup({
      loginRequest,
      redirectUri: '/'
  }).catch((error) => console.log(error));
  }
  return (
    <div className="landingPage">
      <div className="img-page">
        <img src={Picture} alt="" className="picture" />
      </div>
      <div className="text-page">
        <div className="text-center">
          <h1 className="big-title"> Havis 360 Unified License Portal</h1>
          <div className="btn-page">
            <button className="btn" onClick={handleLogin}>Login</button>
          </div>
        </div>
        <div className="text-bottom">
          <p>
            © Ha-Shem Limited 2022. All Rights Reserved. Powered by
            <a href="" className="text-link">
              Havis 360
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
