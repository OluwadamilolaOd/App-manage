import imageIcon from '../../../assets/images/download_blue.png'



function DownloadModal({ setOpenModal,data }) {

  const handlePDF = (e) => {
    e.preventDefault()
    console.log("helloooPDF")
  }

  const handleCsv = (e) => {
    e.preventDefault()
    console.log("helloooCSV")
  }

  return (
    <div className="modal">
    <div onClick={()=>{setOpenModal(false)}} className="overlay"></div>
    <div className="modal-content">
      <div className='modalTitle downloadModalTile'><h2>Export License</h2></div>     
      <div className="logoutmodalwrapper">
      <img className='modalImg' src={imageIcon} alt='Error'></img>
      <h4>{data.organizationName}-{data.licenseName}</h4>  
      <p id='downloadP'>
        Export License Information
      </p>
      </div>
      <div className="modalbtnwrapper">
      <div className="modalButton "><button className="downloadModalButton" onClick={handlePDF}>
        PDF
      </button>
      </div>
      <div className="modalButton "><button className="downloadModalButton" onClick={handleCsv}>
        EXCEL
      </button></div>
      </div>
    </div>
  </div>
  );
}

export default DownloadModal;