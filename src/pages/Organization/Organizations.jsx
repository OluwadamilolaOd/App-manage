import React from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../../components/Banner';
import { baseUrl } from '../../Hook/baseurl';
import OrgTableSheet from './OrgTableSheet';

const Organizations = () => {

  const url = `${baseUrl}/api/Organizations`
  const headers = ["Company Name", "Email Address", "Phone Number", "Location"]
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate("/addOrganization")
  }

  return (
    <div>
      <Banner title={"Manage Organization"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add Organization"} btnEventHandler={handleEventClick}/>     
      <OrgTableSheet headers={headers} url={url} navigateTo={"/organizationProfile"}/>
    </div>
  )
}

export default Organizations
