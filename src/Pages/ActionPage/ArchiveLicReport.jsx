import React from "react";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import TableAction from "../../Components/Table/TableAction"

const ArchiveLicReport = () => {
  return (
    <div>
      <Banner title={"Archive License"} />
      <Search placeholder="Search for Archive License" />
      {/* <TableAction/> */}
      <Pagination />
    </div>
  );
};

export default ArchiveLicReport;
