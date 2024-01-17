import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { ToastContainer} from "react-toastify";
import { notifyError, notifySuccess } from "../../Components/ReactToastify";
import { baseUrl } from "../../Hook/baseurl";
import { useNavigate } from "react-router-dom";


const LicRenewal = () => {
  const [expirationDate, setExpirationDate] = useState("");
  const startDateInputRef = useRef(null);
  const locations = useLocation();
  const data = locations.state.data;
  const Updateurl = `${baseUrl}/purchasedlicense/${data.id}`;
  const navigate = useNavigate();

  //Get User Email from local storage
  const userEmail = JSON.parse(localStorage.getItem("user")).mail;


//navigate Back
  const handleBackArrow = () => navigate(`/organizations/organizationprofile/${data.organizationId}`);

  const handleSubmitRenewal = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(Updateurl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          expirationDate: expirationDate,
          licenseTypeId: data.licenseTypeId,
          CreatedBy: userEmail,
          PurchasedDate: data.purchasedDate,
          OrganizationId: data.organizationId,
          LicenseKey: data.purchasedLicenseKey,

        }),
      });
      await response.json();
      if (response.status === 200) {
        setExpirationDate("");
        notifySuccess("License Renewed Successfully");
      } else {
        notifyError("Some error occurred");
      }
    } catch (err) {
      notifyError(err.message);
    }
  };

  return (
    <div>
      <Banner title={"License Renewal"} />
      <form className="add_container">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div>
          <h1 className="profileName">{data.organizationName}</h1>
        </div>
        <div className="title-head">
          <h4>Current License Information</h4>
        </div>
        <div className="form_input">
          <div>
            <label htmlFor="company-name">License Name:</label>

            <div className="label_input">{data.licenseName}</div>
          </div>
          <div>
            <label htmlFor="email-address">Band Type:</label>
            <div className="label_input">{data.licenseBand}</div>
          </div>
          <div>
            <label htmlFor="location">Start Date:</label>
            <div className="label_input">{data.purchasedDate}</div>
          </div>
          <div>
            <label htmlFor="phone-number">Expiration Date:</label>

            <div className="label_input">{data.expirationDate}</div>
          </div>
        </div>
        <div className="title-head section-head">
          <h4>New License Information</h4>
        </div>
        <div className="form_input">
          <div>
            <label htmlFor="company-name">License Name:</label>
            <div className="label_input">{data.licenseName}</div>
          </div>
          <div>
            <label htmlFor="email-address">Start Date:</label>
            <div className="label_input">{data.purchasedDate}</div>
          </div>
          <div>
            <label htmlFor="location">Band Type:</label>
            <div className="label_input">{data.licenseBand}</div>
          </div>
          <div>
            <label htmlFor="expiration-Date">Expiration Date:</label>
            <input
              type="date"
              id="expiration-date"
              value={expirationDate}
              min={data.expirationDate}
              onChange={(event) => setExpirationDate(event.target.value)}
              ref={startDateInputRef}
            />
          </div>
        </div>
        <div className="btnRight">
          <button type="submit" onClick={handleSubmitRenewal}>
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
export default LicRenewal;
