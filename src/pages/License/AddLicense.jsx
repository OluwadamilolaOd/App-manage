import React, { useState } from "react";
import '../../components/Styles/license.css'
import Banner from "../../components/Banner";

const AddLicense = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage]= useState ("")


  //Submit form function

  let handleSubmitLicense = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://localhost:7245/api/applicense", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          licenseName: name,
          description: description,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setName("");
        setDescription("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <button onClick={handleSubmitLicense} type="submit">Submit</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
};

export default AddLicense;
