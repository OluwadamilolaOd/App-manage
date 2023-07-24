import { useState } from "react";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../Components/Button";

const EmailOrganization = () => {
  const navigate = useNavigate();
  const [ccEmail, setCcEmail] = useState("");
  const [file, setFile] = useState(null);
  const locations = useLocation();
  const [emailNotification, setEmailNotification] = useState(false);
  const data = locations.state.data;
  const [url, setUrl] = useState(`${baseUrl}/PurchasedLicense/SendEmailReminder`)

  // react-toastify
  const notifySuccess = () =>
    toast.success("Email Sent successfully", {
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const ccEmailsArray = ccEmail.split(",").map((email) => email.trim());
    try {
      const formDataObj = new FormData();
      formDataObj.append("Recipient", data.email);
      formDataObj.append("RecipientName", data.organizationName);
      formDataObj.append("licenseName", data.licenseName);
      formDataObj.append("ExpirationDate", data.expirationDate);
      ccEmailsArray.forEach((ccEmail) => {
        formDataObj.append("CcRecipient", ccEmail);
      });
      formDataObj.append("attachment", file);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataObj,
      });
      if (response.ok) {
        notifySuccess("");
        setCcEmail("");
        setFile(null);
      } else {
        notifyError("");
      }
      // Handle the response
      if (response.ok) {
        console.log("Post created successfully!");
      } else {
        console.log("Error creating post!");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleBackArrow = () => {
    navigate(`/organizations/organizationprofile/${data.organizationId}`);
  };

 const handleEventClick = () => {
  setEmailNotification(!emailNotification)
  setUrl(`${baseUrl}/PurchasedLicense/SendEmail`)
 }

 const handleNotificationClick = () => { 
  setEmailNotification(!emailNotification)
  setUrl(`${baseUrl}/PurchasedLicense/SendEmailReminder`)
 }
  return (
    <div>
      <Banner title={"Email Organisation"} />
      <form className=".add_container formPage" onSubmit={handleSubmit}>
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="title-head">
          {/* <label htmlFor="reciver">Reciver</label> */}
          <h3>
            License Information will be sent to this email :
            <span>{data.email}</span>
          </h3>
        </div>
        <div className="emailBtn">
        {!emailNotification? <Button className={"btninactive"} title={"Email License Information"} btnEventHandler={handleEventClick}/>:<Button className={"btnactive"} title={"Email License Information"} btnEventHandler={handleEventClick}/>}
        {!emailNotification?<Button className={"btnactive"} title={"Send Reminder Notification"} btnEventHandler={handleNotificationClick}/>:<Button className={"btninactive"} title={"Send Reminder Notification"} btnEventHandler={handleNotificationClick}/>}
        </div>
        <div className="form-email">
          <div className="input">
            <label htmlFor="CC">Copy Email</label>
            <input
              type="text"
              value={ccEmail}
              onChange={(e) => setCcEmail(e.target.value)}
            />
            <p>Note: Seprate each email with comma</p>
          </div>
         {emailNotification && <div className="input">
            <label htmlFor="file">File (CSV only)</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>} 
        </div>
        <div className="btnRight">
          <button type="submit">Send Email</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmailOrganization;
