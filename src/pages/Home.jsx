import React, { useState, useEffect } from "react";
import CardList from "../Components/Report/CardList";
import { baseUrl } from "../Hook/baseurl";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Auth/authConfig";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bearerToken, setBearerToken ] = useState("")
  const { instance, accounts } = useMsal();

const handleGetData = (e) => {
      e.preventDefault();
    instance
      .acquireTokenSilent({
        loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        setBearerToken(response.accessToken)
        console.log(bearerToken)
            const headers = { 'Authorization': `Bearer ${bearerToken}` };
             fetch(`${baseUrl}/purchasedlicense`,{ headers })
             .then(console.log(response))
      });
  }

 

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
      <button onClick={handleGetData}>GetData</button>
    </div>
  );
};

export default Home;
