import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Auth/authConfig";
import { callMsGraph, callMsGraphImg } from "../Auth/graph";
import "./Styles/header.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "./Sidebar";
import { sideLinks } from "../assets/data/sideLinks";
import { Link } from "react-router-dom";

const Header = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [graphImage, setGraphImage] = useState(null);

  useEffect(() => {
    instance
      .acquireTokenSilent({
        loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
        });
      });
  }, [instance, accounts]);

  // fetch profile picture
  useEffect(() => {
    instance
      .acquireTokenSilent({
        loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraphImg(response.accessToken).then((response) => {
          console.log(response.url);
          // var img = response.url.blob();
          // var imgUrl = URL.createObjectURL(img);
          // setGraphImage(imgUrl)
        });
      });
  }, [instance, accounts]);

  return (
    <div className="header">
      <div className="header_menu">
        <div className="header_right">
          {graphData ? <p>{graphData.givenName}</p> : <p>Loading...</p>}
          <div className="profile">
            <img src={graphImage} alt="profile"></img>
          </div>
          <div className="hamburger">
            <FaBars className="menu-icon"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
