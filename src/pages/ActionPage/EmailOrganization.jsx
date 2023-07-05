import { useState } from "react";
import Banner from "../../Components/Banner";
import ArrowBack from "../../Components/ArrowBack";
import { TiAttachment } from "react-icons/ti";
import "../../Pages/Styles/addorganization.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";

const EmailOrganization = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [file, setFile] = useState();
  const [emailCC, setEmailCC] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

 
const jsonData = {
  "recipient" : emailAddress,
  "subject": emailSubject,
  "ccRecipient" : emailCC,
  "body":description,
};
  const handleBackArrow = () => {
    navigate("/organizations");
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jsonData', JSON.stringify(jsonData));

      const response = await fetch(`${baseUrl}/purchasedlicense/sendemail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify( {
          "recipient" : emailAddress,
          "subject": emailSubject,
          "ccRecipient" : emailCC,
          "body":description,
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Banner title={"Email Organisation"} />
      <form className="add_container ">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div>
          <div className="form-input">
            <label htmlFor="name">Email Subject:</label>
            <input
              type="text"
              id="name"
              value={emailSubject}
              onChange={(event) => setEmailSubject(event.target.value)}
            />
          </div>
          <div className="forminput">
            <div className="section">
              <div className="input">
                <label htmlFor="name">Email Address:</label>
                <input
                  type="text"
                  id="name"
                  value={emailAddress}
                  onChange={(event) => setEmailAddress(event.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="name">Cc:</label>
                <input
                  type="text"
                  id="name"
                  value={emailCC}
                  onChange={(event) => setEmailCC(event.target.value)}
                />
              </div>
            </div>
            <div className="section">
              <div className="input">
                <label htmlFor="Description">Email Body:</label>
                <textarea
                  className="textAreaSize"
                  type="tel"
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>
          </div>

          {/* <div className="attachFiles">
            <input type="file" 
            name="file" 
            onChange={handleFileChange}
            />
            <GrFormAttachment className="attach-icon" />
            <span>Attach Files</span>
          </div> */}
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="btnRight">
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmailOrganization;
