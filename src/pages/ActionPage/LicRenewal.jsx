import React from "react";
import { useState } from "react";
import Banner from "../../components/Banner";
import ArrowBack from "../../components/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LicRenewal = () => {
  const [expirationDate, setExpirationDate] = useState("");


  const handleBackArrow = () => {};

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

  return (
    <div>
      <Banner title={"License Renewal"} />
      <form className="container_form">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div>
          <h1 className="profileName">Organization Name</h1>
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
        <div className="title-head">
          <h4>New License Information</h4>
        </div>
        <div className="form_input">
          <div>
            <label htmlFor="company-name">License Name:</label>
            <div className="label_input">License Name</div>
          </div>
          <div>
            <label htmlFor="email-address">Start Date:</label>
            <div className="label_input">Start Date</div>
          </div>
          <div>
            <label htmlFor="location">Band Type:</label>
            <div className="label_input">Band Type</div>
          </div>
          <div>
            <label htmlFor="expiration-Date">Expiration Date:</label>
            <input
              type="tel"
              id="expiration-Date"
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.target.value)}
            />
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default LicRenewal;
