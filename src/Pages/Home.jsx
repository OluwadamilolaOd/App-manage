import { useEffect } from "react";
import CardList from "../Components/Report/CardList";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Auth/authConfig";

const Home = () => {

	const { instance, accounts } = useMsal();

	useEffect(() => {
		instance
		  .acquireTokenSilent({
			...loginRequest,
			account: accounts[0],
		  })
		  .then((response) => {
			//save token to local storage
			localStorage.setItem("token", response.accessToken);
		  });
	  }, [instance, accounts]);

  return (
    <div>
      <CardList />
    </div>
  );
};

export default Home;
