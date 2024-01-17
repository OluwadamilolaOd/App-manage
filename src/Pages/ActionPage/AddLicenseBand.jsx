import { useState, useEffect } from "react";
import Select from "react-select";
import { baseUrl } from "../../Hook/baseurl";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../Components/ReactToastify";
import "react-toastify/dist/ReactToastify.css";

const AddLicenseBand = () => {
  const paramsValue = useLocation();
  const navigate = useNavigate();
  const options = [
    { value: "newLicenseType", label: "New License" },
    { value: "recurringLicenseType", label: "Recurring License" },
  ];
  const [description, setDescription] = useState("");
  const [bandType, setBandType] = useState("");
  const [maximumUser, setMaximumUser] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  //get token from local storage and set it to state
  const token =localStorage.getItem("token")
  //get user email from local storage
  const userEmail = JSON.parse(localStorage.getItem("user")).mail;

  const handleBackArrow = () => {
    navigate("/license");
  };

  const licenseId = paramsValue.state.paramsValue[0];
  let url = baseUrl + "/licensetype";
  var recurring;

  let handleSubmitLicenseBand = async (e) => {
    e.preventDefault();
    if (selectedOption.value === "newLicenseType") {
      recurring = "";
    } else {
      recurring = "Recurring License Type";
    }
    if (
      selectedOption.length == 0 ||
      bandType.length == 0 ||
      maximumUser.length == 0 ||
      partNumber.length == 0 ||
      description.length == 0
    ) {
      setError(true);
      return;
    }
    else{
      setError(false);

      try {
        let res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`},
  
          body: JSON.stringify({
            description: description,
            licenseBand: bandType,
            partNumber: partNumber,
            maximumUser: maximumUser,
            appLicenseId: licenseId,
            CreatedBy: userEmail,
            recurringLicenseType: recurring,
          }),
        });
        await res.json();
        if (res.status === 200) {
          setDescription("");
          setPartNumber("");
          setMaximumUser("");
          setBandType("");
          setSelectedOption(null);
          notifySuccess("License band successfully created.");
        } else {
          notifyError("Some error occurred.");
        }
      } catch (err) {
        notifyError(err.message);
      }
    }
  };

  return (
    <div>
      <div>
        <Banner title={"Add License Band"} />
        <form className="add_container ">
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
              </div>
              <div className="input">
                <label htmlFor="license-name">Licence Band:</label>
                <input
                  type="text"
                  id="band type"
                  value={bandType}
                  onChange={(event) => setBandType(event.target.value)}
                />
                {error && bandType.length <= 0 ? (
                  <label className="error">This field is required.</label>
                ) : (
                  ""
                )}
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
            <div className="section">
              <div className="input">
                <label htmlFor="phone-number">Part Number:</label>
                <input
                  type="text"
                  id="partnumber"
                  value={partNumber}
                  onChange={(event) => setPartNumber(event.target.value)}
                />
                {error && partNumber.length <= 0 ? (
                  <label className="error">This field is required.</label>
                ) : (
                  ""
                )}
              </div>
              <div className="input">
                <label htmlFor="location">Description:</label>
                <textarea
                  className="textArea"
                  type="text"
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                {error && description.length <= 0 ? (
                  <label className="error">This field is required.</label>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="btnRight">
            <button type="submit" onClick={handleSubmitLicenseBand}>
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddLicenseBand;
