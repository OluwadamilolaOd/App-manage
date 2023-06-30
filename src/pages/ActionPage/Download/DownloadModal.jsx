import { useState } from "react";
import imageIcon from "../../../assets/images/download_blue.png";
import { CSVLink } from "react-csv";
// import { PDFDownloadLink, Document, Page, Text } from 'react-pdf';

function DownloadModal({ setOpenModal, data }) {
  // const [csvData, setCsvData] = useState([]);
  // const handlePDF = (e) => {
  //   e.preventDefault()
  //   console.log(data)
  //   console.log("helloooPDF")
  // }

  // const MyPdfDocument = () => (
  //   <Document>
  //     <Page>
  //       <Text>This is the content of my PDF document.</Text>
  //     </Page>
  //   </Document>
  // );

  const entries = Object.entries(data);

  return (
    <div className="modal">
      <div
        onClick={() => {
          setOpenModal(false);
        }}
        className="overlay"
      ></div>
      <div className="modal-content">
        <div className="modalTitle downloadModalTile">
          <h2>Export License</h2>
        </div>
        <div className="logoutmodalwrapper">
          <img className="modalImg" src={imageIcon} alt="Error"></img>
          <h4>
            {data.organizationName}-{data.licenseName}
          </h4>
          <p id="downloadP">Export License Information</p>
        </div>
        <div className="modalButton">
          <CSVLink
            className="btnblue"
            data={entries}
            filename={`${data.organizationName}-license-file.csv`}
          >
            Download me
          </CSVLink>
        </div>
      </div>
    </div>
  );
}

export default DownloadModal;
