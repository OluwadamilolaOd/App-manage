import React, { useState } from "react";
import "../../Pages/Styles/editorganization.css";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";

const EditOrganization = () => {
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBackArrow = () => {};

  return (
    <div>
      <Banner
        title={"Edit Organization"}
      />

      <form className="add_container ">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="forminput">
          <div className="section">
            <div className="input">
              <label htmlFor="company-name">Company Name:</label>
              <input
                type="text"
                id="company-name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="email-address">Email Address:</label>
              <input
                type="email"
                id="email-address"
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
              />
            </div>
          </div>
          <div className="section">
            <div className="input">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="phone-number">Phone Number:</label>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditOrganization;
