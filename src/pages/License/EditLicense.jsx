import React, { useState } from 'react';
import Select from "react-select";
import Banner from '../../components/Banner';

const EditLicense = ({ itemId, initialContent }) => {
    const [content, setContent] = useState(initialContent);
    const [name, setName] = useState("");
    const [maximumUser, setMaximumUser] = useState("");
    const [partNumber, setPartNumber] = useState("");
    const [bandType, setBandType] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);



    const options = [
        { value: "newLicenseType", label: "New License Type" },
        { value: "recurringLicenseType", label: "Recurring License Type" },
      ];
    
    
      const handleContentChange = (event) => {
        setContent(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`/api/items/${itemId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
          });
          
        } catch (error) {
          // Handle fetch error
          console.error('Error updating item', error);
        }
      };

      const handleSubmitLicenseBand = () => console.log("helloooo")

        return (
            <div><Banner
            title={"Edit License Band"}
            btnClassname={"btnwhite"}
            btntitle={"Edit Button"}
          />
             <form className="addlicensebandcontainer">
            {/* <ArrowBack handleBackArrow={handleBackArrow} /> */}
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
                  <label htmlFor="location">description:</label>
                  <textarea
                    className="textareaSize"
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
            <button type="submit" onClick={handleSubmitLicenseBand}>
              Edit
            </button>
  
            {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
          </form>
          </div>
           
        );
}

export default EditLicense
