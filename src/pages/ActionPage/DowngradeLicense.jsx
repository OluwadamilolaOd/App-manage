import { useState, useEffect, useRef } from "react";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import { useLocation,  useNavigate } from "react-router-dom";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../../Auth/graph";
import { loginRequest } from "../../Auth/authConfig";
import { baseUrl } from "../../Hook/baseurl";

const DowngradeLicense = () => {
  const [expirationDate, setExpirationDate] = useState("");
  const [selectedLicenseBandOption, setSelectedLicenseBandOption] =
  useState("");
  const [licenseBandOptions, setLicenseBandOptions] = useState([]); 
  const locations = useLocation();
  const startDateInputRef = useRef(null)
  const data = locations.state.data;
  const url = `${baseUrl}/licenseType/upgrade?maximumuser=${data.maximumUser}&applicenseId=${data.appLicenseId}`;
  const Updateurl = `${baseUrl}/purchasedlicense/${data.id}`;
  const navigate = useNavigate();


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

   const handleBackArrow = () => navigate("/organizations");
  
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

    useEffect(() => {
      const fetchData = async () => {
        try {
          await fetch(url)
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

    const handleSubmitDowngrade = async (event) => {
      event.preventDefault();
      console.log(expirationDate, selectedLicenseBandOption.id)
      try {
        const response = await fetch(Updateurl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expirationDate: expirationDate,
            licenseTypeId: selectedLicenseBandOption.id,
            CreatedBy: graphData.mail,
            PurchasedDate: data.purchasedDate,
            OrganizationId: data.organizationId
          }),
        });
      } catch (err) {
        // Handle fetch error
        notifyError.log(err);;
      }
    }

  return (
    <div>
      <Banner
        title={"License Downgrade"}
      />
     <form className="add_container">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="profileName"> 
          <h1 >Organization Name</h1>
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
        <button type="submit" onClick={handleSubmitDowngrade}>Save</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DowngradeLicense;
