import { useState } from "react";
import Banner from "../../components/Banner";

const AddLicenseBand = () => {
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div>
      <div>
        <Banner
          title={"Add License Band"}
          btnClassname={"btnwhite"}
          btntitle={"Edit Button"}
        />

        <form className="addlicensebandcontainer">
        <div className="input">
                <label htmlFor="company-name">License Type:</label>
                <input
                  type="text"
                  id="company-name"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                />
              </div>
          <div className="forminput">
            <div className="section">
              <div className="input">
                <label htmlFor="company-name">License Name:</label>
                <input
                  type="text"
                  id="company-name"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="email-address">Range:</label>
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
                <label htmlFor="location">Band Type:</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="phone-number">Part Number:</label>
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
    </div>
  );
};

export default AddLicenseBand;
