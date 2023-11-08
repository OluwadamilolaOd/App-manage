import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
import archiveIcon from '../../assets/images/archive_red.png'
import DownloadModal from "../ActionPage/Download/DownloadModal";
import DowngradeModal from "../../Components/Modal/DowngradeModal";
import archiveIconS from '../../assets/images/Archive_icon.png'
const OrgPurchasedLicesTableChildren = ({ obj, deleteItem }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false)
  const [downgradeLicense, setDowngradeLicense] = useState(false)
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  //All Event handlers

  const handleUpgrade = () => {
    console.log("You about to get upgraded")
    const data = obj
     navigate(`upgradelicense/${obj.id}`,{state:{data:data}})
  }

  const handleRenewal = () => {
    navigate(`Renewal/${obj.id}`,{state:{data:obj}})
  }

  const handleArchive = () => {
    deleteItem(obj.id)
    setOpenModal(false)
  };

  const handleEmail = () => {
    navigate(`emailorganization/${obj.id}`,{state:{data:obj}})
  }

  //Handle Downgrade Action.
  const handleDowngrade = () => {
    const currentDate = new Date();
    const date1 = new Date(obj.expirationDate);
  
    if (date1 > currentDate) {
        setDowngradeLicense(true)
    } else {
      navigate(`downgradelicense/${obj.id}`,{state:{data:obj}})
    }
  }

  

//Handle Logic for calculating the number of days left for license to expire.
const date1 = new Date();
const date2 = new Date(obj.expirationDate);
const diffTime = (date2 - date1);
let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
if (diffDays < 0) { diffDays = "Expired"}
else { diffDays = diffDays + " days" }


  return (
    <>
      <tr key={obj.id} style={{color:diffDays === "Expired" && "red"}}>
        <td>{obj.licenseName}</td>
        <td>{obj.licenseBand}</td>
        <td>{obj.maximumUser}</td>
        <td>{obj.partNumber}</td>
        <td>{diffDays}</td>
        <td>{obj.purchasedDate}</td>
        <td>{obj.expirationDate}</td>
        
        <td className="actionbtn" onClick={handleDropdownToggle}>
          ...
        </td> 
        {showDropdown && (
          <div className="action">
            <div className="action-item" onClick={handleRenewal}>
              <p>Renew</p>
            </div>
            <div className="action-item" onClick = {handleUpgrade}>
              <p>Upgrade</p>
            </div>
            <div className="action-item" onClick = {handleEmail}>
              <p>Email</p>
            </div>
            <div className="action-item" onClick={() => {setOpenDownloadModal(true)}}>
              <p>Export</p>
            </div>
            <div className="action-item"  onClick = {handleDowngrade}>
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
                    imageIcon={archiveIconS}
                    btnAction={"Archive"}
                    title= {obj.licenseBand}
                   description= { "Are you sure you want to archive?"}   
                    handleOnclickEvent={handleArchive}
      />}
      {openDownloadModal && <DownloadModal setOpenModal = {setOpenDownloadModal} data = {obj} />}

    {downgradeLicense && <DowngradeModal
                    setOpenModal={setDowngradeLicense}
                    header={"Downgrade License"}
                    image={archiveIcon}
                    btnAction={""}
                    title= {obj.licenseName}
                    description={"You cannot downgrade the license except it has expired"}
                    handleOnclickEvent={handleArchive}/>}
    </>
  );
};

export default OrgPurchasedLicesTableChildren;
