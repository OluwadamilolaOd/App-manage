import React, { useState, useEffect } from 'react'
import Banner from '../../components/Banner'
import { baseUrl } from '../../Hook/baseurl'
import { useNavigate, useParams } from 'react-router-dom'
import TableAction from '../../components/Table/TableAction'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const LicenseType = () => {

  const navigate = useNavigate();
  const userParams = useParams();
  const [data, setData] = useState();
  const paramsValue = Object.values(userParams)
  const url = `${baseUrl}/licenseType/license/${paramsValue}`
  const headers = ["Band Type", "Maximum User", "Part Number", "Action"]
  const mainUrl = `${baseUrl}/applicense/${paramsValue}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(mainUrl)
          .then((response) => response.json())
          .then((data) => {
            setData(data)
          });
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [mainUrl]);

  const handleEventClick = () => {
    navigate("/license/addLicenseBand",{state : {paramsValue:paramsValue}})
  }


  const handleAction = () => {

  } 
  return (
    <div>
      <Banner title={` ${data? data.licenseName:""} License`} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add License Band"} btnEventHandler={handleEventClick}/>
      <TableAction headers={headers} url = {url} actionEvent={handleAction}/>
      <ToastContainer />
    </div>
  )
}

export default LicenseType
