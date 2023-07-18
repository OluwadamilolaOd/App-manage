import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Select from "react-select";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";
import { callMsGraph } from "../../Auth/graph";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Auth/authConfig";
import { ToastContainer, toast } from "react-toastify";

const EditLicense = () => {
  const location = useLocation();
  const data = location.state.data;
  console.log(data);
  const [maximumUser, setMaximumUser] = useState(data.maximumUser);
  const [partNumber, setPartNumber] = useState(data.partNumber);
  const [bandType, setBandType] = useState(data.licenseBand);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userParams = useParams();
  const paramsValue = Object.values(userParams);
  const url = `${baseUrl}/licenseType/${paramsValue}`;
  var recurring;

  //fetch current user from Azure
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const options = [
    { value: "newLicenseType", label: "New License Type" },
    { value: "recurringLicenseType", label: "Recurring License Type" },
  ];

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
  // const notifyError = () => toast("Some error occurred");
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

  const handleBackArrow = () => {
    navigate(`/license/licenseType`);
  };

  console.log(data);

  useEffect(() => {
    instance
      .acquireTokenSilent({
        loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
          console.log(response);
        });
      });
  }, [instance, accounts]);

  const handleSubmitLicenseBand = async (event) => {
    event.preventDefault();
    if (selectedOption.value === "newLicenseType") {
      recurring = "";
    } else {
      recurring = "Recurring License Type";
    }
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          licenseBand: bandType,
          partNumber: partNumber,
          maximumUser: maximumUser,
          CreatedBy: graphData.mail,
          description: data.description,
          recurringLicenseType: recurring,
        }),
      });
      await response.json();
      if (response.status === 200) {
        notifySuccess("");
      } else {
        notifyError("");
      }

      if (
        selectedOption.length == 0 ||
        maximumUser.length == 0 
      ){
        setError(true);
      }
      if (
        selectedOption &&
        maximumUser
      ) {
        console.log(
          "Licence Type: ",
          selectedOption,
          "\nMaximum User: ",
          maximumUser,
        );
      }
    } catch (err) {
      // Handle fetch error
      notifyError.log(err);
    }
  };

  return (
    <div>
      <Banner title={"Edit License Band"} />
      <form className="add_container">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="forminput">
          <div className="section">
            <div className="input">
              <label htmlFor="band type">Licence Type:</label>
              <Select
                className="select"
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
              />
               {error && selectedOption.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
            <div className="input">
              <label htmlFor="license-name">Licence Band:</label>
              <input
                type="text"
                id="band type"
                value={bandType}
                onChange={(event) => setBandType(event.target.value)}
              />
            </div>
          </div>
          <div className="section">
            <div className="input">
              <label htmlFor="phone-number">Part Number:</label>
              <input
                type="text"
                id="partnumber"
                value={partNumber}
                onChange={(event) => setPartNumber(event.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="band type">Maximum User:</label>
              <input
                type="number"
                id="maximumUser"
                value={maximumUser}
                onChange={(event) => setMaximumUser(event.target.value)}
              />
              {error && maximumUser.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="btnRight">
          <button type="submit" onClick={handleSubmitLicenseBand}>
            Edit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditLicense;
