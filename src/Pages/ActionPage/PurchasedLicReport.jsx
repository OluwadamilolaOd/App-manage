import React from "react";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import TableSheet from "../../Components/Table/TableSheet";
import Pagination from "../../Components/Pagination";

const PurchasedLicReport = () => {
  const headers = [
    "License Name",
    "Band Type",
    "Max. User",
    "Organization",
  ];
  return (
    <div>
      <Banner title={"Purchased License"} />
      <Search placeholder="Search for Purchased License" />
      <TableSheet headers={headers} />
      <Pagination />
    </div>
  );
};

export default PurchasedLicReport;
