import React from "react";
import { useState, useRef, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../Hook/baseurl";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Auth/authConfig";
import { callMsGraph } from "../../Auth/graph";


const LicRenewal = () => {
  const [expirationDate, setExpirationDate] = useState("");
  const startDateInputRef = useRef(null)
  const locations = useLocation();
  const data = locations.state.data;
  console.log(data)
  const Updateurl = `${baseUrl}/purchasedlicense/${data.id}`;


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


  const handleBackArrow = () => {};

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

    const handleSubmitRenewal = async (event) => {
      event.preventDefault();
      console.log(expirationDate)
      try {
        const response = await fetch(Updateurl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expirationDate: expirationDate,
            licenseTypeId: data.licenseTypeId,
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
      <Banner title={"License Renewal"} />
      <form className="container_form">
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
        <div className="title-head">
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
                onChange={(event) => setExpirationDate(event.target.value)}
                ref={startDateInputRef}
              />
          </div>
        </div>
        <button type="submit" onClick={handleSubmitRenewal}>Save</button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default LicRenewal;
