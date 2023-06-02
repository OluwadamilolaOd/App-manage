import React from 'react'
import Banner from '../../components/Banner'
import { useNavigate } from 'react-router-dom'
import TableSheet from '../../components/Table/TableSheet';
import {baseUrl} from './../../Hook/baseurl';
import Search from '../../components/Search';

const License = () => {

  const navigate = useNavigate();
  const url = `${baseUrl}/api/AppLicense`
  const headers = ["Name","Description"]

  const handleEventClick = () => {
    navigate("addNewLicense")
  }
  return (
    <div>
      <Banner title={"Manage License"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add New License"} btnEventHandler={handleEventClick} />
      <TableSheet headers={headers} url={url} navigateTo={"licenseType"} />
    </div>
  )
}

export default License
