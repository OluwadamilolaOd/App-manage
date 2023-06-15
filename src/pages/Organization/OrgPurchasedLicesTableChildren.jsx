import { useState } from "react";
import { useNavigate } from "react-router-dom";


const OrgPurchasedLicesTableChildren = ({ obj }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  //All Event handlers

  const handleUpgrade = () => {
    console.log("You about to get upgraded")
    const data = obj
    console.log(data)
     navigate(`upgradelicense/${obj.id}`,{state:{data:data}})
  }

const date1 = new Date();
const date2 = new Date(obj.expirationDate);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <tr key={obj.id}>
        <td>{obj.licenseName}</td>
        <td>{obj.licenseBand}</td>
        <td>{obj.maximumUser}</td>
        <td>{obj.partNumber}</td>
        <td>{diffDays} days</td>
        <td>{obj.purchasedDate}</td>
        <td>{obj.expirationDate}</td>
        
        <td>
          <div className="actionbtn" onClick={handleDropdownToggle}>...</div>
        </td>
        {showDropdown && (
          <div className="action">
            <div className="action-item">
              <p>Renew</p>
            </div>
            <div className="action-item" onClick = {handleUpgrade}>
              <p>Upgrade</p>
            </div>
            <div className="action-item">
              <p>Email</p>
            </div>
            <div className="action-item">
              <p>Export</p>
            </div>
            <div className="action-item">
              <p>Downgrade</p>
            </div>
            <div className="action-item">
              <p>Archive</p>
            </div>
          </div>
        )}
      </tr>
    </>
  );
};

export default OrgPurchasedLicesTableChildren;
