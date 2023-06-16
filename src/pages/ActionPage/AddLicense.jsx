import React, { useState, useEffect } from "react";
import "../../Pages/Styles/license.css";
import Banner from "../../Components/Banner";
import { baseUrl } from "../../Hook/baseurl";
import ArrowBack from "../../Components/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../Auth/authConfig";
import { callMsGraph } from "../../Auth/graph";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLicense = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  //fetch current user from Azure
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    instance
      .acquireTokenSilent({
        loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
          console.log(response);
        });
      });
  }, [instance, accounts]);

  // react-toastify
  const notifySuccess = () =>
    toast.success("User created successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  // const notifyError = () => toast("Some error occurred");
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
  const handleBackArrow = () => {
    navigate("/license");
  };

  //Submit form function
  let handleSubmitLicense = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${baseUrl}/applicense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseName: name,
          description: description,
          CreatedBy: graphData.mail,
        }),
      });
      await res.json();
      if (res.status === 200) {
        setName("");
        setDescription("");
        notifySuccess("");
      } else {
        notifyError("");
      }

      if (name.length == 0 || description.length == 0) {
        setError(true);
      }
      if (name && description) {
        console.log("Name: ", name, "\nDescription: ", description);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Banner
        title={"Add New License"}
      />

      <form className="add_container formPage">
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
            {error && name.length <= 0 ? (
              <label className="error">This field is required.</label>
            ) : (
              ""
            )}
          </div>
          <div className="input">
            <label htmlFor="Description">Description:</label>
            <textarea
              className="textarea"
              type="tel"
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
        <div className="btnBig">
        <button onClick={handleSubmitLicense} type="submit">
          Submit
        </button>
        </div>  
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddLicense;
