import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { callMsGraph, callMsGraphImg, callMsGraphRoles } from "../Auth/graph";
import "./Styles/header.css";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [graphImage, setGraphImage] = useState(null);



  //fetch user data to get loging profile details
  useEffect(() => {
    instance
      .acquireTokenSilent({
        scopes:['User.Read'],
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => { 
          setGraphData(response);
        });
      });
  }, []);

  // // fetch user role
  // useEffect(() => {
  //   instance
  //     .acquireTokenSilent({
  //       loginRequest,
  //       account: accounts[0],
  //     })
  //     .then((response) => {
  //       callMsGraphRoles(response.accessToken).then((response) => {
  //         setGraphRole(response);
  //         console.log(response);
  //       });
  //     });
  // }, [instance, accounts]);

  // fetch profile picture
  useEffect(() => {
    instance
      .acquireTokenSilent({
        scopes:['User.Read'],
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



  return (
    <div className="header">
      <div className="header_menu">
        <div className="hamburger">
          <FaBars className="menu-icon" />
        </div>
        {/* <Sidebar className="nav-sidebar"/> */}
        <div className="header_right">
          {graphData ? <p>{graphData.givenName}</p> : <p>Loading...</p>}
          {/* {activeAccount ? activeAccount.name : 'Unknown'} */}
          <div className="profile">
            <img className="profileImg" src={graphImage} alt="profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
