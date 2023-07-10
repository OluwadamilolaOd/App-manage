import { useState } from "react";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import "../../Pages/Styles/addorganization.css";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";

const EmailOrganization = () => {
  const navigate = useNavigate();
  const [ccEmail, setCcEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const locations = useLocation();
  const data = locations.state.data;
  console.log(data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ccEmailsArray = ccEmail.split(',').map((email) => email.trim());
    try {
      const formDataObj = new FormData();
      formDataObj.append('Recipient', data.email);
      formDataObj.append('RecipientName', data.organizationName);
      formDataObj.append('licenseName', data.licenseName);
      formDataObj.append('Subject', subject);
      ccEmailsArray.forEach((ccEmail) => {
        formDataObj.append('CcRecipient', ccEmail);
      });
      formDataObj.append('attachment', file);

      
      const response = await fetch(`${baseUrl}/PurchasedLicense/SendEmail`, {
        method: 'POST',
        body: formDataObj,
      });

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
    navigate("/organizations");
  };
  return (
    <div>
      <Banner title={"Email Organisation"} />
      <form className=".add_container formPage" onSubmit={handleSubmit}>
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="title-head">
          {/* <label htmlFor="reciver">Reciver</label> */}
          <h2>License Information will be sent to this email :<span className="emailTxt">{data.email}</span></h2>
        </div>
        <div className="form-email">
        <div className="input">
            <label htmlFor="CC">Email Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            </div>

          <div className="input">
            <label htmlFor="CC">Copy Email</label>
            <input
              type="text"
              value={ccEmail}
              onChange={(e) => setCcEmail(e.target.value)}
            />
            <p>Note: Seprate each email with comma</p>
          </div>
          <div className="input">
            <label htmlFor="file">File (CSV only)</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="btnRight">
          <button type="submit">Send Email</button>
        </div>
      </form>
    </div>
  );
};

export default EmailOrganization;
