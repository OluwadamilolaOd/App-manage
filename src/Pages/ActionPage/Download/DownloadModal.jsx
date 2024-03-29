import { useState } from "react";
import imageIcon from "../../../assets/images/download_blue.png";
import { CSVLink } from "react-csv";
// import { PDFDownloadLink, Document, Page, Text } from 'react-pdf';



function DownloadModal({ setOpenModal,data }) {

   // Remove some properties from the original object
   const modifiedObject = (({id, appLicenseId, createdAt,createdBy,licenseTypeId,organizationId, ...rest }) => rest)(data);
   console.log(modifiedObject);
  const keyArrays = Object.keys(modifiedObject)
  const valueArrays = Object.values(modifiedObject)
  const combineArray = [keyArrays,valueArrays]

  return (
    <div className="modal">
    <div onClick={()=>{setOpenModal(false)}} className="overlay"></div>
    <div className="modal-content">
      <div className='modalTitle downloadModalTile'><h2>Export License</h2></div>     
      <div className="logoutmodalwrapper">
      <img className='modalImg' src={imageIcon} alt='Error'></img>
      <h4>{data.organizationName}-{data.licenseName}</h4>  
      <p id='downloadP'>
        Export License Information as (CSV)
      </p>
      </div>
      <div className="modalbtnwrapper">
      <div className="modalButton ">
        <CSVLink className='btnblue' data={combineArray} filename={`${data.organizationName}-license-file.csv`}>Download</CSVLink>
      </div>
      </div>
    </div>
    </div>
  );
}

export default DownloadModal;
