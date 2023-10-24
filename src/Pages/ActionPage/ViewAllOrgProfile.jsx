import React from "react";
import ArrowBack from "../../Components/ArrowBack";
import { useNavigate } from "react-router-dom";

const ViewAllOrgProfile = () => {
  const navigate = useNavigate();
  const handleEditOrg = () => {
    navigate("/editorganization");
  };

  const handleBackArrow = () => {
    navigate("/");
  };
  return (
    <div>
      <ArrowBack handleBackArrow={handleBackArrow} />
      <div className="viewAll">
        <div className="bannerView">
          <h1>Company Full Name</h1>
        </div>
        <div className="formView">
            <div className="section">
              <div className="section-view">
                <span>Company Name</span>
                <p>Interswitch</p>
              </div>
              <div className="section-view">
                <span>Location</span>
                <p>Lagos, Nigeria </p>
              </div>
              <div className="section-view">
                <span>Contact Person</span>
                <p>Annatoria Folkes</p>
              </div>
              <div className="section-view">
                <span>Contact Person Phone Number</span>
                <p>0812 345 6789</p>
              </div>
            </div>
            <div className="section">
              <div className="section-view">
                <span>Email Address</span>
                <p>admin@Interswitch.com </p>
              </div>
              <div className="section-view">
                <span>Phone Number</span>
                <p>0808 123 4567</p>
              </div>
              <div className="section-view">
                <span>Contact Person Email Address</span>
                <p>Annatoriafo@interswitch.com </p>
              </div>
              <div className="section-view">
                <span>Account Manager</span>
                <p>Ibukunoluwa Quake</p>
              </div>
            </div>
        </div>
        <div className="btnBigView">
          <button onClick={handleEditOrg} type="submit">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllOrgProfile;
