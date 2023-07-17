import React, { useState } from "react";
import "../../Pages/Styles/editorganization.css";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { useNavigate,useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../Hook/baseurl";

const EditOrganization = () => {
  const locations = useLocation();
  const data = locations.state.data;
  console.log(data)
  const [companyName, setCompanyName] = useState(data.organizationName);
  const [emailAddress, setEmailAddress] = useState(data.email);
  const [location, setLocation] = useState(data.address);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const url = `${baseUrl}/Organizations/${data.id}`;
  const token = localStorage.getItem("token");

  const handleBackArrow = () => navigate(`/organizations/organizationprofile/${data.id}`);

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

  const handleSubmitEditOrg = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch (url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          organizationName: companyName,
          email: emailAddress,
          address: location,
          phoneNumber: phoneNumber,
        }),
      });
      await response.json();
      if (response.status === 200) {
        notifySuccess("");
      } else {
        notifyError("");
      }

    } catch (error) {
      console.log(error)
    }
    setCompanyName("");
    setEmailAddress("");
    setLocation("");
    setPhoneNumber("");
    notifySuccess("");
    // notifyError("")

    if (
      companyName.length == 0 ||
      emailAddress.length == 0 ||
      location.length == 0 ||
      phoneNumber.length == 0
    ) {
      setError(true);
    }
    if (companyName && emailAddress && location && phoneNumber) {
      console.log(
        "Company Name: ",
        companyName,
        "\nEmail Address: ",
        emailAddress,
        "\nLocation: ",
        location,
        "\nPhone Number: ",
        phoneNumber
      );
    }
  };

  return (
    <div>
      <Banner title={"Edit Organization"} />

      <form className="add_container ">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="forminput">
          <div className="section">
            <div className="input">
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
            <div className="input">
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
            <div className="input">
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
            <div className="input">
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
        <div className="btnRight">
          <button type="submit" onClick={handleSubmitEditOrg}>
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditOrganization;
