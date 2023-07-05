import React, { useState, useEffect } from "react";
import CardList from "../Components/Report/CardList";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { loginRequest, msalConfig } from "../Auth/authConfig";
import { protectedResources } from "../Auth/AzAuthConfig";
import useFetchWithMsal from "../Hook/useFetchWithMSAL";


const Home = () => {

  const { error, execute } = useFetchWithMsal({
    scopes: protectedResources.toDoListAPI.scopes.read,
});

useEffect(() => {
      execute("GET", 'https://localhost:7245/api/PurchasedLicense').then((response) => {
          console.log(response)
      });
}, [execute])
if (error) {
  console.log(error);
}


  
  return (
    <div>
      <CardList />
    </div>
  );
};

export default Home;
