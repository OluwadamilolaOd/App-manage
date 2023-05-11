import React, { useState } from "react";
import '../../components/Styles/license.css'
import Banner from "../../components/Banner";

const AddLicense = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      <Banner
        title={"Add New License"}
        btnClassname={"btnwhite"}
        btntitle={"Edit Button"}
      />

      <form className="addLicenseContainer">
        <div className="form">
            <div className="input">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="Description">Description:</label>
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

export default AddLicense;
