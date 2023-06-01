import React, { useState, useEffect } from "react";
import "../../components/Styles/addorganization.css";
import ArrowBack from "../../components/ArrowBack";
import Select from "react-select";
import { baseUrl } from "../../Hook/baseurl";

const AddOrganization = () => {
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [completeData, setCompleteData] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedLicenseTypeOption, setSelectedLicenseTypeOption] = useState(null);
  const [licenseTypeOptions, setLicenseTypeOptions] = useState([])
  const [licenseBandOptions, setLicenseBandOptions] = useState([])

  


  const url = `${baseUrl}/api/AppLicense`

  const handleBackArrow = () => {

  }

  // const fetchUsers = () => {
  //   return  myApi.get('/users?page=1').then(result => {
  //     const res =  result.data.data;
  //     return res;
  //   });
  // }


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setCompleteData(data)
            // let completeData = Object.values(data);
            const licenseName = data.map((obj)=>{
              return {"id":obj.id, "label":obj.licenseName}
            })
            setLicenseTypeOptions(licenseName)
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url]);


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(selectedOption)
  }

  const url2 = `${baseUrl}/api/licenseType/license/${selectedOption ? selectedOption.id: "12"}`

  const handleFetchBand = () => {

    try {
       fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          // let completeData = Object.values(data);
          const licenseBand = data.map((obj)=>{
            return {"label":obj.licenseBand}
          })

          setLicenseBandOptions(licenseBand)
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <form className="form_container">
        <ArrowBack handleBackArrow = {handleBackArrow}/>
        <div className="title-head">
          <h3>Organization Details</h3>
        </div>
        <div className="forminput">
          <div className="section">
            <div>
              <label htmlFor="company-name">Company Name:</label>
              <input
                type="text"
                id="company-name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address">Email Address:</label>
              <input
                type="email"
                id="email-address"
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
              />
            </div>
          </div>
          <div className="section">
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone-number">Phone Number:</label>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="title-head"><h3>License Details</h3></div>
        <div className="forminput">
          <div className="section">
            <div>
              <label htmlFor="company-name">License Name:</label>
              <Select className="select"
              options={licenseTypeOptions}
              value={selectedOption}
              onChange={setSelectedOption}
            />
            </div>
            <div>
              <label htmlFor="email-address">Start Date:</label>
              <input
                type="email"
                id="email-address"
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
              />
            </div>
          </div>
          <div className="section">
            <div>
              <label htmlFor="location">Band Type:</label>
              <Select className="select"
              isOptionSelected={handleFetchBand}
              options={licenseBandOptions}
              // value={selectedLicenseTypeOption}
              // onChange={setSelectedLicenseTypeOption}
            />
            </div>
            <div>
              <label htmlFor="phone-number">Expiration Date:</label>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
          </div>
        </div>
        <button onClick={submitHandler} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddOrganization;
