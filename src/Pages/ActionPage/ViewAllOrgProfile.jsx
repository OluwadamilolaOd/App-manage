import React from "react";
import ArrowBack from "../../Components/ArrowBack";
import { useNavigate, useLocation  } from "react-router-dom";

const ViewAllOrgProfile = () => {
  const navigate = useNavigate();
  const locations = useLocation();
  const data = locations.state.data;

  console.log(data)
  const handleEditOrg = () => {
    navigate(`/organizations/organizationprofile/${data.id}/editorganization`, { state: { data: data } });
  };

  const handleBackArrow = () => {
    navigate(`/organizations/organizationprofile/${data.id}`);
  };
  return (
    <div>
      <ArrowBack handleBackArrow={handleBackArrow} />
      <div className="viewAll">
        <div className="bannerView">
          {data && <h1>{data.organizationName}</h1> }
          
        </div>
       {data&& <div className="formView">
            <div className="section">
              <div className="section-view">
                <span>Company Name</span>
                <p>{data.organizationName}</p>
              </div>
              <div className="section-view">
                <span>Location</span>
                <p>{data.address}</p>
              </div>
              <div className="section-view">
                <span>Contact Person</span>
                <p>{data.contactPerson}</p>
              </div>
              <div className="section-view">
                <span>Contact Person Phone Number</span>
                <p>{data.contactPhone}</p>
              </div>
            </div>
            <div className="section">
              <div className="section-view">
                <span>Email Address</span>
                <p>{data.email}</p>
              </div>
              <div className="section-view">
                <span>Phone Number</span>
                <p>{data.phoneNumber}</p>
              </div>
              <div className="section-view">
                <span>Contact Person Email Address</span>
                <p>{data.contactPersonEmail}</p>
              </div>
              <div className="section-view">
                <span>Account Manager</span>
                <p>{data.accountManager}</p>
              </div>
            </div> </div>} 
        
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
