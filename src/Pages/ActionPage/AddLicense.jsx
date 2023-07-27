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
  //get token from local storage and set it to state
  const token =localStorage.getItem("token")

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
    toast.success("License successfully created.", {
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
    toast.error("something went wrong", {
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

    if (name.length == 0 || description.length == 0) {
      setError(true);
      return;
    } else {
      setError(false);
      try {
        let res = await fetch(`${baseUrl}/applicense`, {
          method: "POST",
          headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            licenseName: name,
            description: description,
            CreatedBy: graphData.mail,
          }),
        });
        const data = await res.json();
        if (res.status === 200) {
          setName("");
          setDescription("");
          notifySuccess("License successfully created.");
        } else {
          notifyError("something went wrong.");
        }
      } catch (err) {
        console.log(err);
        notifyError(err.message);
      }
    }
    
  };

  return (
    <div>
      <Banner title={"Add New License"} />

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
