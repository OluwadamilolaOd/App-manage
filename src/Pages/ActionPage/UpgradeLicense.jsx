import { useState, useRef, useEffect } from "react";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../Components/ReactToastify";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { baseUrl } from "../../Hook/baseurl";


const UpgradeLicense = () => {

  const [expirationDate, setExpirationDate] = useState("");
  const [selectedLicenseBandOption, setSelectedLicenseBandOption] =
  useState("");
  const [licenseBandOptions, setLicenseBandOptions] = useState([]); 
  const [error, setError] = useState([]); 
  const locations = useLocation();
  const startDateInputRef = useRef(null)
  const data = locations.state.data;
  const url = `${baseUrl}/licenseType/upgrade?maximumuser=${data.maximumUser}&applicenseId=${data.appLicenseId}`;
  const Updateurl = `${baseUrl}/purchasedlicense/${data.id}`;
  const navigate = useNavigate();

  //Get User Email from local storage
  const userEmail = JSON.parse(localStorage.getItem("user")).mail;

//navigate back
    const handleBackArrow = () => navigate(`/organizations/organizationprofile/${data.organizationId}`);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
    }, [url]);


    const handleSubmitUpgrade = async (event) => {
      event.preventDefault();
      console.log(expirationDate, selectedLicenseBandOption.id)
      try {
        const response = await fetch(Updateurl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            expirationDate: expirationDate,
            licenseTypeId: selectedLicenseBandOption.id,
            CreatedBy: userEmail,
            PurchasedDate: data.purchasedDate,
            OrganizationId: data.organizationId,
            LicenseKey: data.purchasedLicenseKey,
          }),
        });
        await response.json();
        if (response.status === 200) {
          setExpirationDate("");
          setSelectedLicenseBandOption(null);
          notifySuccess("License successfully updated.");
        } else {
          notifyError("");
        }
        } catch (err) {
          // Handle fetch error
         setError(err.message);
          notifyError("something went wrong.");
        }
    }

  return (
    <div>
      <Banner
        title={"License Upgrade"}
        btnClassname={"btnwhite"}
        btntitle={"Edit Button"}
      />
      <form className="add_container">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="profileName">
          <h1>{data.organizationName}</h1>
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
            <Select
                className="select"
                options={licenseBandOptions}
                value={selectedLicenseBandOption}
                onChange={setSelectedLicenseBandOption}
              />
          </div>
          <div>
            <label htmlFor="phone-number">Expiration Date:</label>
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
        <button type="submit" onClick={handleSubmitUpgrade}>Save</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpgradeLicense;
