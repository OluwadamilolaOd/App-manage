import { useState } from "react";
import Select from "react-select";
import { baseUrl } from "../../Hook/baseurl";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import ArrowBack from "../../components/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddLicenseBand = () => {
  const paramsValue = useLocation();
  const navigate = useNavigate();
  const options = [
    { value: "newLicenseType", label: "New License Type" },
    { value: "recurringLicenseType", label: "Recurring License Type" },
  ];
  const [description, setDescription] = useState("");
  const [bandType, setBandType] = useState("");
  const [maximumUser, setMaximumUser] = useState("");
  const [partNumber, setPartNumber] = useState("");
  // const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(selectedOption);
  //   console.log(selectedOption.value);
  //   console.log(paramsValue.state.paramsValue[0]);
  // };

  const handleBackArrow = () => {
    navigate("/license");
  };

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

  const licenseId = paramsValue.state.paramsValue[0];
  let url;

  let handleSubmitLicenseBand = async (e) => {
    e.preventDefault();
    if (selectedOption.value === "newLicenseType") {
      url = baseUrl + "/api/licensetype";
    } else {
      url = baseUrl + "/api/recurringlicensetype";
    }
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description,
          licenseBand: bandType,
          partNumber: partNumber,
          maximumUser: maximumUser,
          appLicenseId: licenseId,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setDescription("");
        setPartNumber("");
        setMaximumUser("");
        setBandType("");
        setSelectedOption(null);
        notifySuccess("");
      } else {
        notifyError("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <Banner
          title={"Add License Band"}
          btnClassname={"btnwhite"}
          btntitle={"Edit Button"}
        />

        <form className="addlicensebandcontainer">
          <ArrowBack handleBackArrow={handleBackArrow} />
          {/* <div className="input">
                <label htmlFor="company-name">License Type:</label>
                <input
                  type="text"
                  id="company-name"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                />
              </div> */}
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
              </div>
              <div className="input">
                <label htmlFor="band type">Maximum User:</label>
                <input
                  type="number"
                  id="maximumUser"
                  value={maximumUser}
                  onChange={(event) => setMaximumUser(event.target.value)}
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
                <label htmlFor="location">description:</label>
                <textarea
                  className="textareaSize"
                  type="text"
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
          </div>
          <button type="submit" onClick={handleSubmitLicenseBand}>
            Submit
          </button>

          {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddLicenseBand;
