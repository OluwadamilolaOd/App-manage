import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DowngradeLicense = () => {
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleBackArrow = () => {
    navigate("/organizations")
  };
  
  // react-toastify
  const notifySuccess = () =>
    toast.success("User created successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyError = () =>
    toast.error("Some error occurred", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  
     const handleSubmitDowngrade = (event) => {
      notifySuccess("");
    } 

  return (
    <div>
      <Banner
        title={"License Downgrade"}
      />
     <form className="add_container">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="profileName"> 
          <h1 >Organization Name</h1>
        </div>
        <div className="title-head">
          <h4>Current License Information</h4>
        </div>
        <div className="form_input">
          <div>
            <label htmlFor="company-name">License Name:</label>
            <div className="label_input">License Name</div>
          </div>
          <div>
            <label htmlFor="email-address">Band Type:</label>
            <div className="label_input">Band Type</div>
          </div>

          <div>
            <label htmlFor="location">Start Date:</label>
            <div className="label_input">Start Date</div>
          </div>
          <div>
            <label htmlFor="phone-number">Expiration Date:</label>
            <div className="label_input">Expiration Date</div>
          </div>
        </div>
        <div className="title-head section-head">
          <h4>New License Information</h4>
        </div>
        <div className="form_input">
          <div>
            <label htmlFor="company-name">License Name:</label>
            <div className="label_input">License Name</div>
          </div>
          <div>
            <label htmlFor="email-address">Start Date:</label>
            <input
              type="email"
              id="email-address"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="location">Band Type:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone-number">Expiration Date:</label>
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
        </div>
        <div className="btnRight">
        <button type="submit" onClick={handleSubmitDowngrade}>Save</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DowngradeLicense;
