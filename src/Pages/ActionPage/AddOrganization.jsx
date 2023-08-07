import React, { useState, useEffect, useRef } from "react";
import ArrowBack from "../../Components/ArrowBack";
import Select from "react-select";
import { baseUrl } from "../../Hook/baseurl";
import { generateProductKey } from "../../Components/GenKey";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import "../Styles/license.css"

const AddOrganization = () => {
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(false);
  //get token from local storage and set it to state
  const token =localStorage.getItem("token")

  const [selectedLicenseBandOption, setSelectedLicenseBandOption] =
    useState("");
  const [selectedLicenseTypeOption, setSelectedLicenseTypeOption] =
    useState("");
  const [licenseTypeOptions, setLicenseTypeOptions] = useState([]);
  const [licenseBandOptions, setLicenseBandOptions] = useState([]);

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const navigate = useNavigate();

  //URLS

  //get license Type url
  const url = `${baseUrl}/AppLicense`;
  //get license Band url
  const url2 = `${baseUrl}/licenseType/license/${selectedLicenseTypeOption.id}`;
  //post company details url
  const CompanyDetailsUrl = `${baseUrl}/Organizations`;
  //post company license url
  const CompanyLicenseUrl = `${baseUrl}/PurchasedLicense`;
  //get user email from local storage
  const userEmail = JSON.parse(localStorage.getItem("user")).mail;



  // react-toastify
  const notifySuccess = () =>
    toast.success("Organization successfully  created.", {
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
    toast.error("Some error occurred.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  //Navigate back to the previous page
  const handleBackArrow = () => navigate("/organizations");

  //Get Product Key
  const keyLength = 20;

  //Selected Option 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url, {
          method:"GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        })
          .then((response) => response.json())
          .then((data) => {
            const licenseName = data.map((obj) => {
              return { id: obj.id, label: obj.licenseName };
            });
            setLicenseTypeOptions(licenseName);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url, token]);

  //Selected option 2

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url2,{
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const bandType = data.map((obj) => {
              return { id: obj.id, label: obj.licenseBand };
            });
            setLicenseBandOptions(bandType);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url2,token]);

  //Submit Company details and License Details

  let handleSubmit = async (e) => {
    e.preventDefault();
    const productKey = generateProductKey(keyLength);
    if (
      companyName.length === 0 ||
      emailAddress.length === 0 ||
      location.length === 0 ||
      phoneNumber.length === 0 ||
      selectedLicenseTypeOption.length === 0 ||
      startDate.length === 0 ||
      selectedLicenseBandOption.length === 0 ||
      endDate.length === 0
    ) {
      setError(true);
      return;
    } 
    else {
      setError(false)
      try {
      await fetch(CompanyDetailsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
       },
        body: JSON.stringify({
          organizationName: companyName,
          email: emailAddress,
          phoneNumber: phoneNumber,
          address: location,
          CreatedBy: userEmail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let companyId = data.id;
          fetch(CompanyLicenseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
            body: JSON.stringify({
              purchasedDate: startDate,
              expirationDate: endDate,
              organizationId: companyId,
              licenseTypeId: selectedLicenseBandOption.id,
              licenseKey: productKey,
              CreatedBy: userEmail,
            }),
          });
          setCompanyName("");
          setEmailAddress("");
          setPhoneNumber("");
          setLocation("");
          setStartDate("");
          setEndDate("");
          setSelectedLicenseBandOption("");
          setSelectedLicenseTypeOption("");
          notifySuccess("");
        });
    } catch (err) {
       console.log(err);
      notifyError.log(err.message);
    }
  };
};

  return (
    <div>
      <form className="add_container add_orgPage">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="title-head">
          <h2>Organization Details</h2>
        </div>
        <div className="forminput">
          <div className="section">
            <div className="section-form">
              <label htmlFor="company-name">Company Name:</label>
              <input
                type="text"
                id="company-name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
              {error && companyName.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
            <div  className="section-form">
              <label htmlFor="email-address">Email Address:</label>
              <input
                type="email"
                id="email-address"
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
              />
              {error && emailAddress.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="section">
            <div className="section-form">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
              {error && location.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
            <div  className="section-form">
              <label htmlFor="phone-number">Phone Number:</label>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              {error && phoneNumber.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="title-head section-title">
          <h2>License Details</h2>
        </div>
        <div className="forminput">
          <div className="section">
            <div className="section-form">
              <label htmlFor="company-name">License Name:</label>
              <Select
                className="select"
                options={licenseTypeOptions}
                value={selectedLicenseTypeOption}
                onChange={setSelectedLicenseTypeOption}
              />
              {error && selectedLicenseTypeOption.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
            <div  className="section-form">
              <label htmlFor="start-date">Start Date:</label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                ref={startDateInputRef}
              />
              {error && startDate.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="section">
            <div className="section-form">
              <label htmlFor="location">Band Type:</label>
              <Select
                className="select"
                options={licenseBandOptions}
                value={selectedLicenseBandOption}
                onChange={setSelectedLicenseBandOption}
              />
              {error && selectedLicenseBandOption.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
            <div  className="section-form">
              <label htmlFor="end-date">Expiration Date:</label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                ref={endDateInputRef}
              />
              {error && endDate.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="btnRight">
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
        </div>
        {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddOrganization;
