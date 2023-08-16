import React from 'react'
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import TableAction from "../../Components/Table/TableAction"

const ExpiredLicReport = () => {
  return (
    <div>
      <Banner title={"Expired License"} />
      <Search placeholder="Search for Expired License" />
      {/* <TableAction/> */}
      <Pagination />
    </div>
  )
}

export default ExpiredLicReport
