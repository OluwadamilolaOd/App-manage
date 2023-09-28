import React from 'react'
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import TableSheet from "../../Components/Table/TableSheet";

const ExpiredLicReport = () => {
  const headers = [
    "Organization",
    "License Name",
    "Band Type",
    "Max. User",
    "Start Date",
    "Exp. Date",
  ];
  return (
    <div>
      <Banner title={"Expired License"} />
      <Search placeholder="Search for Expired License" />
      <TableSheet headers={headers} />
      <Pagination />
    </div>
  )
}

export default ExpiredLicReport
