import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import archiveIcon from '../../assets/images/archive_red.png'


const OrgPurchasedLicesTableChildren = ({ obj, deleteItem }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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

  const handleArchive = () => {
    deleteItem(obj.id)
    setOpenModal(false)
  };


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
            <div className="action-item" onClick={() => {
                setOpenModal(true);
              }}>
              <p>Archive</p>
            </div>
          </div>
        )}
      </tr>
      {openModal && <Modal
                    setOpenModal={setOpenModal}
                    header={"Archive License"}
                    image={archiveIcon}
                    btnAction={"Archive"}
                    title= {obj.licenseBand}
                    description={"Are you sure you want to archive?"}
                    handleOnclickEvent={handleArchive}
      />}
    </>
  );
};

export default OrgPurchasedLicesTableChildren;
