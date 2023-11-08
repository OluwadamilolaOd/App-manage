import React, { useState } from "react";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../Hook/baseurl";

const EditOrganization = () => {
  const locations = useLocation();
  const data = locations.state.data;
  const [companyName, setCompanyName] = useState(data.organizationName);
  const [emailAddress, setEmailAddress] = useState(data.email);
  const [location, setLocation] = useState(data.address);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [contactPerson, setContactPerson] = useState(data.contactPerson);
  const [contactEmail, setContactEmail] = useState(data.contactPersonEmail);
  const [contactPhone, setContactPhone] = useState(data.contactPhone);
  const [accountManger, setAccountManger] = useState(data.accountManager);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const url = `${baseUrl}/Organizations?id=${data.id}`;
  const token = localStorage.getItem("token");
  //get user email from local storage
  const userEmail = JSON.parse(localStorage.getItem("user")).mail;

  const handleBackArrow = () =>
    navigate(`/organizations/organizationprofile/${data.id}`);

  // react-toastify
  const notifySuccess = () =>
    toast.success("Organization successfully edited.", {
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
    toast.error("Some error occurred.", {
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
    if (
      companyName.length == 0 ||
      emailAddress.length == 0 ||
      location.length == 0 ||
      phoneNumber.length == 0 ||
      contactEmail.length === 0 ||
      contactPerson.length === 0 ||
      contactPhone.length === 0 ||
      accountManger.length === 0 
    ) {
      setError(true);
    } else {
      try {
        const response = await fetch(url, {
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
            contactPerson: contactPerson,
            contactPersonEmail: contactEmail,
            contactPhone: contactPhone,
            accountManager: accountManger,
            createdBy: userEmail,
          }),
        });
        await response.json();
        if (response.status === 200) {
          notifySuccess("");
        } else {
          notifyError("");
        }
      } catch (error) {
        console.log(error);
      }
      setCompanyName("");
      setEmailAddress("");
      setLocation("");
      setPhoneNumber("");
      setContactEmail("");
      setContactPerson("");
      setContactPhone("");
      setAccountManger("");
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
          <div className="section">
            <div className="input">
              <label htmlFor="contact-person">Contact Person:</label>
              <input
                type="text"
                id="contact-person"
                value={contactPerson}
                onChange={(event) => setContactPerson(event.target.value)}
              />
              {error && contactPerson.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
            <div className="input">
              <label htmlFor="contact-email">
                Contact Person Email Address:
              </label>
              <input
                type="email"
                id="contact-email"
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
              />
              {error && contactEmail.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="section">
            <div className="input">
              <label htmlFor="contact-phone">
                Contact Person Phone Number:
              </label>
              <input
                type="tel"
                id="contact-phone"
                value={contactPhone}
                onChange={(event) => setContactPhone(event.target.value)}
              />
              {error && contactPhone.length <= 0 ? (
                <label className="error">This field is required.</label>
              ) : (
                ""
              )}
            </div>
            <div className="input">
              <label htmlFor="account-manger">Account Manager:</label>
              <input
                type="text"
                id="account-manager"
                value={accountManger}
                onChange={(event) => setAccountManger(event.target.value)}
              />
              {error && accountManger.length <= 0 ? (
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
