import React, { useState } from "react";
import Banner from "../../components/Banner";

const AddLicense = () => {
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div>
      <Banner
        title={"Add New License"}
        btnClassname={"btnwhite"}
        btntitle={"Edit Button"}
      />

      <form className="formcontainer">
        <div className="forminput">
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
              <label htmlFor="phone-number">Phone Number:</label>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddLicense;
