import React from "react";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import TableAction from "../../Components/Table/TableAction"

const ActiveLicReport = () => {
  return (
    <div>
      <Banner title={"Active License"} />
      <Search placeholder="Search for Active License" />
      {/* <TableAction/> */}
      <Pagination />
    </div>
  );
};

export default ActiveLicReport;
