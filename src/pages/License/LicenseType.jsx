import React from 'react'
import Banner from '../../components/Banner'
import { baseUrl } from '../../Hook/baseurl'
import { useNavigate, useParams } from 'react-router-dom'
import TableAction from '../../components/Table/TableAction'
import { licenseTypeData } from '../../assets/data/licenseTypeData';

const LicenseType = () => {

  const navigate = useNavigate();
  const userParams = useParams();
  const paramsValue = Object.values(userParams)
  const url = `${baseUrl}/api/AppLicense/${paramsValue}`
  const headers = ["Name","Band Type", "Maximum User", "Part Number", "Action"]

  const handleEventClick = () => {
    navigate("/license/addLicenseBand")
  }

  const handleAction = () => {

  } 
  return (
    <div>
      <Banner title={"Manage STAAS License"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add License Band"} btnEventHandler={handleEventClick}/>
      <TableAction headers={headers} url = {url} action = {"..."} actionEvent={handleAction}/>
    </div>
  )
}

export default LicenseType
