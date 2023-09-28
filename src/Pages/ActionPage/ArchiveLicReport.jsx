import React from "react";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import TableAction from "../../Components/Table/TableAction";

const ArchiveLicReport = () => {
  const headers = [
    "License Name",
    "Band Type",
    "Max. User",
    "Organization",
    "Action",
  ];
  return (
    <div>
      <Banner title={"Archive License"} />
      <Search placeholder="Search for Archive License" />
      <TableAction headers={headers} />
      <Pagination />
    </div>
  );
};

export default ArchiveLicReport;
