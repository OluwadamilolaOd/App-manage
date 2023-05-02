import React from "react";
import './Styles/editorganization.css'
import Banner from "./Banner";

const EditOrganization = () => {
  return (
    <div>
      <Banner title={"Edit Organization"} btnClassname={"btnwhite"} btntitle={"Edit Button"} />
      <form className="formcontainer">
        <div className="company">
          <label>Company Name</label>
          <input></input>
        </div>
        <div className="email">
          <label>Email Address</label>
          <input></input>
        </div>
        <div className="location">
          <label>Location</label>
          <input></input>
        </div>
        <div className="phoneNumber">
          <label>Phone Number</label>
          <input></input>
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};

export default EditOrganization;
