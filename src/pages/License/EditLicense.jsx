import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import Select from "react-select";
import Banner from '../../components/Banner';
import { baseUrl } from '../../Hook/baseurl';
import { callMsGraph } from '../../Auth/graph';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../Auth/authConfig';

const EditLicense = () => {

  const location = useLocation();
  const data = location.state.data;
    const [maximumUser, setMaximumUser] = useState(data.maximumUser);
    const [partNumber, setPartNumber] = useState(data.partNumber);
    const [bandType, setBandType] = useState(data.licenseBand);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState(false);

    const userParams = useParams();
    const paramsValue = Object.values(userParams)
    const url = `${baseUrl}/licenseType/${paramsValue}`
    var recurring;

      //fetch current user from Azure
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

    const options = [
        { value: "newLicenseType", label: "New License Type" },
        { value: "recurringLicenseType", label: "Recurring License Type" },
      ];


      console.log(data)

      useEffect(() => {
        instance
          .acquireTokenSilent({
            loginRequest,
            account: accounts[0],
          })
          .then((response) => {
            callMsGraph(response.accessToken).then((response) => {
              setGraphData(response);
            });
          });
      }, [instance, accounts]);


      const handleSubmitLicenseBand = async (event) => {
        event.preventDefault();
        if(selectedOption.value === "newLicenseType" ) {
          recurring = ""
       }
       else {
         recurring = "Recurring License Type"
       } 
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              licenseBand: bandType,
              partNumber: partNumber,
              maximumUser: maximumUser,
              CreatedBy: graphData.mail,
              description: data.description,
              recurringLicenseType: recurring,
            }),
          });
          
        } catch (error) {
          // Handle fetch error
          console.error('Error updating item', error);
        }
      };


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
