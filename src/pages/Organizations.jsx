import React from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../components/Banner'

const Organizations = () => {

  const navigate = useNavigate();

  const handleOrgPro = () => {
    navigate("/organizationProfile")
    
  }
  return (
    <div>
      <Banner title={"Manage Organization"} />
      <button onClick={handleOrgPro}>Click me</button>
    </div>
  )
}

export default Organizations
