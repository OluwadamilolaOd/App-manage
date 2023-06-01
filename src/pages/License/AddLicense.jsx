import React, { useState } from "react";
import "../../components/Styles/license.css";
import Banner from "../../components/Banner";
import { baseUrl } from "../../Hook/baseurl";
import ArrowBack from "../../components/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLicense = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //Submit form function

  const handleBackArrow = () => {};

  // react-toastify
  const notifySuccess = () =>
    toast.success("User created successfully", 
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
    );
  // const notifyError = () => toast("Some error occurred");
  const notifyError = () =>
    toast.error("Some error occurred", 
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
    );

  let handleSubmitLicense = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${baseUrl}/api/applicense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseName: name,
          description: description,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setName("");
        setDescription("");
        notifySuccess();
      } else {
        notifyError();
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
        <ArrowBack handleBackArrow={handleBackArrow} />
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
        <button onClick={handleSubmitLicense} type="submit">
          Submit
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddLicense;
