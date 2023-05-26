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
import { Component } from 'react';

const Header = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [graphImage, setGraphImage] = useState(null);

  //hamburger
  // state = {clicked:false};
  // handleClick =()=>{
  //   this.setState({clicked:
  //     !this.state.clicked})
  // }

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
          console.log(response);
          setGraphImage(response);
        });
      });
  }, [instance, accounts]);

  return (
    <div className="header">
      <div className="header_menu">
        <div className="header_right">
          {graphData ? <p>{graphData.givenName}</p> : <p>Loading...</p>}
          <div className="profile">
            <img className="profile-img"
              src="https://hover.blog/wp-content/uploads/2015/08/dot-online-120x720.png"
              alt="profile"
            ></img>
          </div>
        </div>
        <div className="hamburger">
        {/* <div className="hamburger" onClick={this.handleClick}> */}
          <FaBars />
          {/* <FaBars className={this.state.clicked ? {AiOutlineClose} :"menu-icon" }/> */}
          {/* <Sidebar /> */}
        </div>

        {/* hamburger */}
        {/* <div className="header_bar">
          <Link to="#" className="menu-bar">
            <FaBars onClick={showSidebar} />
          </Link>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-Item">
              <li className="navbar-toggle">
                <Link to="#" className="menu-bar">
                  <AiOutlineClose />
                </Link>
              </li>
              {sideLinks.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.display}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div> */}

        {/* <Sidebar /> */}
      </div>
    </div>
  );
};

export default Header;
