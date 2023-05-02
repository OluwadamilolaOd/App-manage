import React from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../components/Banner'
import TableSheet from '../components/TableSheet';

const Organizations = () => {

  const navigate = useNavigate();

  const handleOrgPro = () => {
    navigate("/organizationProfile")
    
  }
  return (
    <div>
      <Banner title={"Manage Organization"} />
      <button onClick={handleOrgPro}>Click me</button>
      
      <TableSheet />
    </div>
  )
}

export default Organizations
