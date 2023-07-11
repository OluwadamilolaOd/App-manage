import React, { useState} from "react";
import CardList from "../Components/Report/CardList";



const Home = () => {

//get token from local storage and set it to state
//const [token, setToken] = useState(null);
  const token =localStorage.getItem("token")

const handleClick = () => {
        fetch("https://localhost:7103/api/PurchasedLicense", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
    }


  
  return (
    <div>
      <CardList />
      <button onClick={handleClick}>Get Data</button>
    </div>
  );
};

export default Home;
