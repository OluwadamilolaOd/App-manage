import React, { useState, useEffect, useRef } from "react";
import "../../components/Styles/addorganization.css";
import Banner from "../../components/Banner";
import ArrowBack from "../../components/ArrowBack";
import Select from "react-select";
import { generateProductKey } from "../../components/GenKey";
import { useNavigate, useLocation } from "react-router";
import { baseUrl } from "../../Hook/baseurl";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Auth/authConfig";
import { callMsGraph } from "../../Auth/graph";
import { ToastContainer, toast } from "react-toastify";

const OrgLicense = () => {
  const [selectedLicenseBandOption, setSelectedLicenseBandOption] =
    useState("");
  const [selectedLicenseTypeOption, setSelectedLicenseTypeOption] =
    useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [licenseTypeOptions, setLicenseTypeOptions] = useState([]);
  const [licenseBandOptions, setLicenseBandOptions] = useState([]);
  const [comapnyId, setCompanyId] = useState("");
  const [error, setError] = useState(false);
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;

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

  //Navigate back to the previous page
  const handleBackArrow = () => navigate("/organizationProfile");

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

  //Submit Company add License

  let handleSubmit = async (e) => {
    e.preventDefault();
    const productKey = generateProductKey(keyLength);
    try {

        await  fetch(CompanyLicenseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              purchasedDate: startDate,
              expirationDate: endDate,
               organizationId: data.id,
              licenseTypeId: selectedLicenseBandOption.id,
              licenseKey: productKey,
              CreatedBy: graphData.mail,
            }),
          });
          setStartDate("");
          setEndDate("");
          setSelectedLicenseBandOption("");
          setSelectedLicenseTypeOption("");
          notifySuccess("");
          // setMessage("User created successfully");

      if (
        selectedLicenseTypeOption.length == 0 ||
        startDate.length == 0 ||
        selectedLicenseBandOption.length == 0 ||
        endDate.length == 0
      ) {
        setError(true);
      }
      if (
        selectedLicenseTypeOption &&
        startDate &&
        selectedLicenseBandOption &&
        endDate
      ) {
        console.log(
          //   "\nLicense Name: "
          //   selectedLicenseTypeOption,
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
      <Banner title={"Add New License"} />
      <form className="formContainer">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="forminput">
          <div className="section">
            <div className="form-section">
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
            <div className="form-section">
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
            <div className="form-section">
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
            <div className="form-section">
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
      </form>
      <ToastContainer />
    </div>
  );
};

export default OrgLicense;
