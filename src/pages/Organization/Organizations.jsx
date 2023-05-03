import React from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../../components/Banner'
import TableSheet from '../../components/TableSheet';

const Organizations = () => {

  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate("/addOrganization")
  }

  return (
    <div>
      <Banner title={"Manage Organization"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add Organization"} btnEventHandler={handleEventClick}/>     
      <TableSheet />
    </div>
  )
}

export default Organizations
