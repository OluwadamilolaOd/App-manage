import React from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../../components/Banner'
import TableSheet from '../../components/Table/TableSheet';
import { organizationsData } from '../../assets/data/organizationData';

const Organizations = () => {

  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate("/addOrganization")
  }

  return (
    <div>
      <Banner title={"Manage Organization"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add Organization"} btnEventHandler={handleEventClick}/>     
      <TableSheet sheetTable={organizationsData}/>
    </div>
  )
}

export default Organizations
