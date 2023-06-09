import React, { useState, useEffect } from 'react'
import Banner from '../../components/Banner'
import { baseUrl } from '../../Hook/baseurl'
import { useNavigate, useParams } from 'react-router-dom'
import TableAction from '../../components/Table/TableAction'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal/Modal'


const LicenseType = () => {

  const navigate = useNavigate();
  const userParams = useParams();
  const [data, setData] = useState();
  const [completeData, setcompleteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false)
  const paramsValue = Object.values(userParams)
  const url = `${baseUrl}/licenseType/license/${paramsValue}`
  const headers = ["Band Type", "Maximum User", "Part Number","status", "Action"]
  const mainUrl = `${baseUrl}/applicense/${paramsValue}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(mainUrl),
          fetch(url),
        ]);
        const data1 = await response1.json();
        const data2 = await response2.json();
        setData(data1)
        setcompleteData(data2)
        setLoading(!loading)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [mainUrl,url]);



  const handleEventClick = () => {
    navigate("/license/addLicenseBand",{state : {paramsValue:paramsValue}})
  }

  return (
    <div>
      <Banner title={` ${data? data.licenseName:""} License`} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add License Band"} btnEventHandler={handleEventClick}/>
      <TableAction headers={headers} data={completeData} loading={loading} setOpenModal = {setOpenModal} />
      <Pagination url={url} setcompleteData={setcompleteData}/>
      {openModal && <Modal />}
      <ToastContainer />
    </div>
  )
}

export default LicenseType
