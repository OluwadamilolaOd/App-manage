import React, {useEffect} from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Auth/authConfig";
import CardList from "../Components/Report/CardList";



const Home = () => {

  const { instance, accounts } = useMsal();

    //Get Data from Private API using Browser Fetch
    useEffect(() => {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => localStorage.setItem("token", response.accessToken));
    }, [instance, accounts]);
//get token from local storage and set it to state
  const token =localStorage.getItem("token")

  
  return (
    <div>
      <CardList />
    </div>
  );
};

export default Home;
