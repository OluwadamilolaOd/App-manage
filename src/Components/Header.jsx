import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { callMsGraph, callMsGraphImg} from "../Auth/graph";
import "./Styles/header.css";
import { FaBars, FaWindowClose } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Header = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [graphImage, setGraphImage] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const msalInstance = instance.acquireTokenSilent({
    scopes: ["User.Read"],
    account: accounts[0],
  });

//fetch user data to get loging profile details
  const getUserData = async () => {

    msalInstance
    .then((response) => {
      callMsGraph(response.accessToken).then((response) => {
        setGraphData(response);
        //save to local storage
        localStorage.setItem("user", JSON.stringify(response));
      });
    });
  };

//fetch user picture
  const getUserPicture = async () => {
      msalInstance
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
  };

  useEffect(() => {
    getUserData();
    getUserPicture();
  }, []);

  return (
    <div className="header">
      <div className="header_menu">
        <div className="hamburger" onClick={() => setShowSidebar(true)}>
          < FaBars className="menu-icon" />
        </div>
        <div className="close-icon" onClick={() => setShowSidebar(false)}>
          <FaWindowClose className="menu-icon-icon" />
        </div>
        <div className="header_right">
          {graphData ? <p>{graphData.givenName}</p> : <p>Loading...</p>}
          <div className="profile">
            <img className="profileImg" src={graphImage} alt="profile" />
          </div>
        </div>
      </div>
      {showSidebar && <Sidebar setOpenModal={() => setShowSidebar(false)} />}
    </div>
  );
};

export default Header;
