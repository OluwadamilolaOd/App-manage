import {useState} from "react";
import Banner from "../../components/Banner";
import ArrowBack from "../../components/ArrowBack";

const EmailOrganization = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [description, setDescription] = useState("");

    const handleBackArrow = () => {

    }

  return (
    <div>
      <Banner
        title={"Add New License"}
        btnClassname={"btnwhite"}
        btntitle={"Edit Button"}
      />
      <form className="form_container">
        <ArrowBack handleBackArrow = {handleBackArrow}/>
        <div className="form">
        <div className="forminput"> 
        <div className="input">
            <label htmlFor="name">email Address:</label>
            <input
              type="text"
              id="name"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </div>

          <div className="input">
            <label htmlFor="name">email Subject:</label>
            <input
              type="text"
              id="name"
              value={emailSubject}
              onChange={(event) => setEmailSubject(event.target.value)}
            />
          </div>
        </div>
          <div className="input">
            <label htmlFor="Description">Email Body:</label>
            <textarea
              className="textareaSize"
              type="tel"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmailOrganization;
