import { useState } from "react";

const OrgPurchasedLicesTableChildren = ({ obj }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const date1 = new Date(obj.purchasedDate);
const date2 = new Date(obj.expirationDate);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(diffTime + " milliseconds");
console.log(diffDays + " days");

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
            <div className="action-item">
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
