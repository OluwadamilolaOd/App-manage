import React from "react";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import TableSheet from "../../Components/Table/TableSheet";
import Pagination from "../../Components/Pagination";

const PurchasedLicReport = () => {

  return (
    <div>
      <Banner title={"Purchased License"} />
      <Search placeholder="Search for Purchased License" />
      {/* <TableSheet /> */}
      <Pagination />
    </div>
  );
};

export default PurchasedLicReport;
