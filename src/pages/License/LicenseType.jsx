import React from 'react'
import Banner from '../../components/Banner'
import { useNavigate } from 'react-router-dom'
import TableAction from '../../components/Table/TableAction'
import { licenseTypeData } from '../../assets/data/licenseTypeData';

const LicenseType = () => {

  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate("/addLicenseBand")
  }
  return (
    <div>
      <Banner title={"Manage STAAS License"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add License Band"} btnEventHandler={handleEventClick}/>
      <TableAction actionTable={licenseTypeData}/>
    </div>
  )
}

export default LicenseType
