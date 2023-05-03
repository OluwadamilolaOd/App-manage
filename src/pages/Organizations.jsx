import React from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../components/Banner'
import TableSheet from '../components/TableSheet';
import DataTable from '../components/DataTable';

const Organizations = () => {

  const navigate = useNavigate();

  const handleOrgPro = () => {
    navigate("/organizationProfile")
    
  }
  return (
    <div>
      <Banner title={"Manage Organization"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add Organization"}/>     
      <TableSheet />
      {/* <DataTable /> */}
    </div>
  )
}

export default Organizations
