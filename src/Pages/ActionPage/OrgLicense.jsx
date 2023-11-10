import React, { useState, useEffect, useRef } from "react";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import Select from "react-select";
import { generateProductKey } from "../../Components/GenKey";
import { useNavigate, useLocation } from "react-router";
import { baseUrl } from "../../Hook/baseurl";
import { ToastContainer, toast } from "react-toastify";

const OrgLicense = () => {
  const [selectedLicenseBandOption, setSelectedLicenseBandOption] =
    useState("");
  const [selectedLicenseTypeOption, setSelectedLicenseTypeOption] =
    useState("");
    const [selectedReminderSetOption, setSelectedReminderSetOption] =
    useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [licenseTypeOptions, setLicenseTypeOptions] = useState([]);
  const [licenseBandOptions, setLicenseBandOptions] = useState([]);
  const [reminderSetOptions, setReminderSetOptions] = useState([]);
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
  //post company license url
  const CompanyLicenseUrl = `${baseUrl}/PurchasedLicense`;

  //get user email from local storage
  const userEmail = JSON.parse(localStorage.getItem("user")).mail;

  //Navigate back to the previous page
  const handleBackArrow = () => {
    navigate("/organizations");
  };

  // react-toastify
  const notifySuccess = () =>
    toast.success("Organization license successfully created.", {
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
        await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, [url]);

  //Selected option 2

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url2, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, [selectedLicenseTypeOption, url2]);

  //Submit Company add License

  let handleSubmit = async (e) => {
    e.preventDefault();


    const productKey = generateProductKey(keyLength);

    if (
      selectedLicenseTypeOption.length === 0 ||
      startDate.length === 0 ||
      selectedLicenseBandOption.length === 0 ||
      endDate.length === 0
    ) {
      setError(true);
      return;
    }
    else {
      setError(false);
      try {
        await fetch(CompanyLicenseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            purchasedDate: startDate,
            expirationDate: endDate,
            organizationId: data.id,
            licenseTypeId: selectedLicenseBandOption.id,
            licenseKey: productKey,
            CreatedBy: userEmail,
          }),
        });
        setStartDate("");
        setEndDate("");
        setSelectedLicenseBandOption("");
        setSelectedLicenseTypeOption("");
        setSelectedReminderSetOption("");
        notifySuccess("");
      } catch (err) {
        notifyError.log(err);
      }
    }
    
  };
  return (
    <div>
      <Banner title={"Add New License"} />
      <form className="add_container ">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="forminput">
          <div className="section">
            <div className="input">
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
            <div className="input">
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
            <div className="input">
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
            <div className="input">
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
          {/* <div className="section">
            <div className="section-form">
              <label htmlFor="reminder">Set Reminder:</label>
              <Select
                className="select"
                options={reminderSetOptions}
                value={selectedReminderSetOption}
                onChange={setSelectedReminderSetOption}
              />
              {error && selectedReminderSetOption.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
          </div> */}
        </div>
        <div className="btnRight">
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default OrgLicense;
