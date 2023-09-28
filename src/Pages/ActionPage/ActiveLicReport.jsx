import React from "react";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import TableSheet from "../../Components/Table/TableSheet";

const ActiveLicReport = () => {
  const headers = [
    "Organization",
    "License Name",
    "Band Type",
    "Max. User",
    "Duration",
    "Start Date",
    "Exp. Date",
  ];
  return (
    <div>
      <Banner title={"Active License"} />
      <Search placeholder="Search for Active License" />
      <TableSheet headers={headers} />
      <Pagination />
    </div>
  );
};

export default ActiveLicReport;
