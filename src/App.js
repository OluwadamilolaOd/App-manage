import { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from '@azure/msal-react';
import "./App.css";
import Layout from "./Components/Layout";
import Modal from "./Components/Modal/Modal";
import logoutImg from "./assets/images/logout_red.png";
import LandingPage from "./Pages/LandingPage";
import { ToastContainer } from "react-toastify";
import LogoutS from "./assets/images/log-out_icon.png"

const MainContent = () => {
  const [openModal, setOpenModal] = useState(false);
  const { instance } = useMsal();


  const handleLogout = () => {
    instance.logoutPopup({
      account: instance.getActiveAccount(),
      mainWindowRedirectUri: '/', // redirects the top level app after logout
  });
  localStorage.clear();
  }
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <div className="full_page">
          <Layout setOpenModal={setOpenModal} />
          {openModal && (
            <Modal
              setOpenModal={setOpenModal}
              header={"Log Out"}
              image={logoutImg}
              btnAction={"Log out"}
              imageIcon={LogoutS}
              title={<h3>Log out</h3>}
              description={"Are you sure you want to Log out?"}
              handleOnclickEvent={handleLogout}
            />
          )}
        </div>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <LandingPage />
        <ToastContainer />
      </UnauthenticatedTemplate>
    </div>
  );
};

function App() {

  return <MainContent />;
}

export default App;
