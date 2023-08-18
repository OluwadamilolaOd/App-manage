import React from "react";
import ArrowBack from "../../Components/ArrowBack";
import Banner from "../../Components/Banner";
import { useNavigate } from "react-router-dom";

const ViewAllOrgProfile = () => {
  const navigate = useNavigate();
  const handleEditOrg = () => {
    navigate("/editorganization")
  }

  const handleBackArrow = () => {
    navigate("/");
  };
  return (
    <div>
      <Banner title={"Profile Details"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Edit"} btnEventHandler={handleEditOrg} />
      <div className="add_container">
        <ArrowBack handleBackArrow={handleBackArrow} />
        <div className="forminput">
          <div className="section">
            <div className="section-view">
                <label htmlFor="">Company Name</label>
                <input type="text" />
            </div>
            <div className="section-view">
                <label htmlFor="">Location</label>
                <input type="text" />
            </div>
            <div className="section-view">
                <label htmlFor="">Contact Person</label>
                <input type="text" />
            </div>
            <div className="section-view">
                <label htmlFor="">Contact Person Phone Number</label>
                <input type="text" />
            </div>
          </div>
          <div className="section">
            <div className="section-view">
                <label htmlFor="">Email Address</label>
                <input type="text" />
            </div>
            <div className="section-view">
                <label htmlFor="">Phone Number</label>
                <input type="text" />
            </div>
            <div className="section-view">
                <label htmlFor="">Contact Person Email Address</label>
                <input type="text" />
            </div>
            <div className="section-view">
                <label htmlFor="">Account Manager</label>
                <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllOrgProfile;
