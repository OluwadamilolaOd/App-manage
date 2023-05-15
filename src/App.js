import { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import "./App.css";
import Layout from "./components/Layout";
import Modal from "./components/Modal/Modal";
import logoutImg from "./assets/images/logout_red.png";
import LandingPage from "./pages/LandingPage";

const MainContent = () => {
  const [openModal, setOpenModal] = useState(false);
  var title = "Archive Organization";
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <div>
          <Layout setOpenModal={setOpenModal} />
          {openModal && (
            <Modal
              setOpenModal={setOpenModal}
              image={logoutImg}
              btnAction={"Log out"}
              title={"Log out"}
              description={"Are you sure you want to Log out?"}
            />
          )}
        </div>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <LandingPage />
      </UnauthenticatedTemplate>
    </div>
  );
};

function App() {

  return <MainContent />;
}

export default App;
