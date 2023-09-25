import React from "react";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import Pagination from "../../Components/Pagination";
import TableSheet from "../../Components/Table/TableSheet";

const ActiveLicReport = () => {
  return (
    <div>
      <Banner title={"Active License"} />
      <Search placeholder="Search for Active License" />
      {/* <TableSheet /> */}
      <Pagination />
    </div>
  );
};

export default ActiveLicReport;
