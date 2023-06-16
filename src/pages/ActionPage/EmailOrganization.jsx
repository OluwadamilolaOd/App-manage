import { useState } from "react";
import Banner from "../../components/Banner";
import ArrowBack from "../../components/ArrowBack";
import { GrFormAttachment } from "react-icons/gr";
import "../../pages/Styles/addorganization.css";

const EmailOrganization = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailCC, setEmailCC] = useState("");
  const [description, setDescription] = useState("");

  const handleBackArrow = () => {};

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

          <div className="attachFiles">
            <GrFormAttachment className="attach-icon" />
            <span>Attach Files</span>
          </div>
        </div>
        <div className="btnRight">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmailOrganization;
