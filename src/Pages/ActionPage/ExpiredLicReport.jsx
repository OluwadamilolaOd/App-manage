import React from 'react'
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import TableSheet from "../../Components/Table/TableSheet";

const ExpiredLicReport = () => {
  return (
    <div>
      <Banner title={"Expired License"} />
      <Search placeholder="Search for Expired License" />
      {/* <TableSheet /> */}
      <Pagination />
    </div>
  )
}

export default ExpiredLicReport
