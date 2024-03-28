import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { callMsGraph, callMsGraphImg, callMsGraphRoles } from "../Auth/graph";
import "./Styles/header.css";
import { FaBars, FaWindowClose } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Header = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [graphImage, setGraphImage] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  //fetch user data to get loging profile details
  useEffect(() => {
    instance
      .acquireTokenSilent({
        scopes: ["User.Read"],

        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
          //save to local storage
          localStorage.setItem("user", JSON.stringify(response));
        });
      });
  }, []);

  // fetch user role
  useEffect(() => {
    instance
      .acquireTokenSilent({
        scopes: ["User.Read"],
        account: accounts[0],
      })
      .then((response) => {
        callMsGraphRoles(response.accessToken).then((response) => {
          //setGraphRole(response);
          console.log(response);
        });
      });
  }, [instance, accounts]);

  // fetch profile picture
  useEffect(() => {
    instance
      .acquireTokenSilent({
        scopes: ["User.Read"],
        account: accounts[0],
      })
      .then(async (response) => {
        callMsGraphImg(response.accessToken).then(async (r) => {
          //get the final buffer of the image
          const finalBuffer = await r.arrayBuffer();
          //pass the buffer to blob and added image type
          const blob = new Blob([finalBuffer], { type: "image/jpg" });
          //set the Object Url
          setGraphImage(URL.createObjectURL(blob));
        });
      });
  }, []);

  // state = { clicked: false };
  // handleClick = () => {
  //   this.setState({ clicked: !this.state.clicked });
  // };

  return (
    <div className="header">
      <div className="header_menu">
        <div onClick={ () => setShowSidebar(!showSidebar)}>
        { showSidebar ? (
        <div className="hamburger">
        <FaWindowClose className="menu-icon" />
      </div>   
          )  : (
        <div className="hamburger">
         < FaBars className="menu-icon" />
       </div>
          )
      }
        </div>
       
       
        <div className="header_right">
          {graphData ? <p>{graphData.givenName}</p> : <p>Loading...</p>}
          <div className="profile">
            <img className="profileImg" src={graphImage} alt="profile" />
          </div>
        </div>
      </div>
      {/* {showSidebar && <Sidebar showSidebar={showSidebar} />} */}
      {showSidebar && <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
    </div>
  );
};

export default Header;
