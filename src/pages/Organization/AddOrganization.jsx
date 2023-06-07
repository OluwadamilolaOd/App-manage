import React, { useState, useEffect, useRef } from "react";
import "../../components/Styles/addorganization.css";
import ArrowBack from "../../components/ArrowBack";
import Select from "react-select";
import { baseUrl } from "../../Hook/baseurl";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Auth/authConfig";
import { callMsGraph } from "../../Auth/graph";
import { generateProductKey } from "../../components/GenKey";
import { ToastContainer, toast } from "react-toastify";

const AddOrganization = () => {
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comapnyId, setCompanyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [selectedLicenseBandOption, setSelectedLicenseBandOption] =
    useState("");
  const [selectedLicenseTypeOption, setSelectedLicenseTypeOption] =
    useState("");
  const [licenseTypeOptions, setLicenseTypeOptions] = useState([]);
  const [licenseBandOptions, setLicenseBandOptions] = useState([]);

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  //URLS

  //get license Type url
  const url = `${baseUrl}/AppLicense`;
  //get license Band url
  const url2 = `${baseUrl}/licenseType/license/${selectedLicenseTypeOption.id}`;
  //post company details url
  const CompanyDetailsUrl = `${baseUrl}/Organizations`;
  //post company license url
  const CompanyLicenseUrl = `${baseUrl}/PurchasedLicense`;

  //fetch current user from Azure
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    instance
      .acquireTokenSilent({
        loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
        });
      });
  }, [instance, accounts]);

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

  //Navigate back to the previous page
  const handleBackArrow = () => {};

  //Get Product Key
  const keyLength = 20;

  //Selected Option 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
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
  }, [url]);

  //Selected option 2

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(url2);
        await fetch(url2)
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
  }, [selectedLicenseTypeOption, url2]);

  //Submit Company details and License Details

  let handleSubmit = async (e) => {
    e.preventDefault();
    const productKey = generateProductKey(keyLength);
    try {
      await fetch(CompanyDetailsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: companyName,
          email: emailAddress,
          phoneNumber: phoneNumber,
          address: location,
          CreatedBy: graphData.mail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.id);
          setCompanyId(data.id);
          fetch(CompanyLicenseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              purchasedDate: startDate,
              expirationDate: endDate,
              organizationId: comapnyId,
              licenseTypeId: selectedLicenseBandOption.id,
              licenseKey: productKey,
              CreatedBy: graphData.mail,
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
          // setMessage("User created successfully");
        });
   
    if (
      companyName.length == 0 ||
      emailAddress.length == 0 ||
      location.length == 0 ||
      phoneNumber.length == 0 ||
      selectedLicenseTypeOption.length == 0 ||
      startDate.length == 0 ||
      selectedLicenseBandOption.length == 0 ||
      endDate.length == 0
    ) {
      setError(true);
    }
    if (
      companyName &&
      emailAddress &&
      location &&
      phoneNumber &&
      selectedLicenseTypeOption &&
      startDate &&
      selectedLicenseBandOption &&
      endDate
    ) {
      console.log(
        "Company Name: ",
        companyName,
        "\nEmail Address: ",
        emailAddress, 
        "\nLocation: ",
        location,
        "\nPhone Number: ",
        phoneNumber,
        // "\nLicense Name: "
        // selectedLicenseTypeOption,
        "\nStart Date: ",
        startDate,
        "\nBand Type: ",
        selectedLicenseBandOption,
        "\nExpiration Data: ",
        endDate
      );
    }
     } catch (err) {
      notifyError.log(err);
    }
  };

  return (
    <div>
      <form className="form_container">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="title-head">
          <h3>Organization Details</h3>
        </div>
        <div className="forminput">
          <div className="section">
            <div>
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
            <div>
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
            <div>
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
            <div>
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
        <div className="title-head">
          <h3>License Details</h3>
        </div>
        <div className="forminput">
          <div className="section">
            <div>
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
            <div>
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
            <div>
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
            <div>
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
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>

        {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddOrganization;
