import React, {useEffect, useState} from 'react'
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../Auth/authConfig';
import { callMsGraph, callMsGraphImg } from '../Auth/graph';
import './Styles/header.css'

const Header = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [graphImage, setGraphImage] = useState(null);
  

  useEffect(() => {
    instance.acquireTokenSilent({
      loginRequest,
      account: accounts[0],
  })
  .then((response) => {
      callMsGraph(response.accessToken).then((response) => {
        setGraphData(response)
      })
  });
  }, [instance,accounts]);

 // fetch profile picture
  useEffect(() => {
    instance.acquireTokenSilent({
      loginRequest,
      account: accounts[0],
  })
  .then((response) => {
    callMsGraphImg(response.accessToken).then((response) => {
      console.log(response)
      setGraphImage(response)
    });
  });
  }, [instance,accounts]);

  return (
    <div className="header">
        <div className="header_right">
           {graphData? (<p>{graphData.givenName}</p>) : <p>Loading...</p>} 
          <div className="profile">
            <img src="https://hover.blog/wp-content/uploads/2015/08/dot-online-120x720.png" alt='profile'></img>
          </div>
        </div>
    </div>
  )
}

export default Header