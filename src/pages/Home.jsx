import React, { useState, useEffect } from "react";
import CardList from "../Components/Report/CardList";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { loginRequest, msalConfig } from "../Auth/authConfig";


const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bearerToken, setBearerToken ] = useState("")
  const { instance, accounts } = useMsal();



      const fetchData = async () => {
        const storedToken = localStorage.getItem('BearerToken');
        console.log(storedToken)

        if (storedToken) {
          try {
            const response = await fetch('https://localhost:7245/api/PurchasedLicense', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
              }
            });
            
            console.log(response)
          } catch (error) {
            console.error(error);
          }
        }
      }
  
  return (
    <div>
      <CardList />
      <button onClick={fetchData}>Get Data</button>
    </div>
  );
};

export default Home;
