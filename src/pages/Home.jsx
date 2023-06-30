import React, { useState, useEffect } from "react";
import CardList from "../Components/Report/CardList";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";


const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bearerToken, setBearerToken ] = useState("")
  const { instance, accounts } = useMsal();


  
    // read: ['api://a606c665-f9f7-49e2-95b9-041c18433646/LicenseEndpoint.read']
    // write: ['api://a606c665-f9f7-49e2-95b9-041c18433646/LicenseEndpoint.ReadWrite']

    // const accessTokenRequest = {
    //   scopes: ['api://a606c665-f9f7-49e2-95b9-041c18433646/LicenseEndpoint.read'],
    //   account: accounts,
    // };

        instance
    .acquireTokenSilent({
      scopes: ['api://a606c665-f9f7-49e2-95b9-041c18433646/LicenseEndpoint.read'],
      account: accounts[0],
    })
    .then((response) => {
      console.log(response.accessToken)
    });

//  const msalRequest = {
//     scopes: loginRequest.scopes.read,
// }
//   const { result, error: msalError } = useMsalAuthentication(InteractionType.Popup, {
//     ...msalRequest,
//     account: instance.getActiveAccount(),
//     redirectUri: '/redirect'
// });

// console.log(result);

//   const msalRequest = {
//     scopes: protectedResources.toDoListAPI.scopes.read,
// }

  // const handleGetData = (e) => {
  //   e.preventDefault();
  //   const { result, error: msalError } = useMsalAuthentication(InteractionType.Popup, {
  //     ...msalRequest,
  //     account: instance.getActiveAccount(),
  //     redirectUri: '/redirect'
  // });
  //   instance
  //   .acquireTokenSilent({
  //     loginRequest,
  //     account: accounts[0],
  //   })
  //   .then((response) => {
  //     setBearerToken(response.accessToken)
  //     console.log(bearerToken)
  //         const headers = { 'Authorization': `Bearer ${bearerToken}` };
  //          fetch(`${baseUrl}/purchasedlicense`,{ headers })
  //          .then(console.log(response))
  //   });


  //   const { result, error: msalError } = useMsalAuthentication(InteractionType.Popup, {
  //     ...msalRequest,
  //     account: instance.getActiveAccount(),
  //     redirectUri: '/redirect'
  // });

  // console.log(result)
  // }


      // const { error, execute } = useFetchWithMsal({
      //     scopes: loginRequest.scopes.read,
      // });
  
      // const [toDoListData, setToDoListData] = useState(null);
  
      // useEffect(() => {
      //      try {
      //       execute("GET", `${baseUrl}/purchasedlicense`).then((response) => {
      //         // setToDoListData(response);
      //         // console.log(toDoListData)
      //         console.log(response)
      //     });
            
      //      } catch (error) {
      //         console.log(error)
      //      } 
      // }, [execute, toDoListData])
 

  // const handleSearch = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   const filtered = data.filter((item) =>
  //     item.description.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  // };
  return (
    <div>
      <CardList />
      {/* <button onClick={handleGetData}>GetData</button> */}
    </div>
  );
};

export default Home;
