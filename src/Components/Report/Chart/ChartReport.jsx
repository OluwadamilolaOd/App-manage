import React from "react";
import "../Chart/chart.css";
import LicenseStatus from "./LicenseStatus";
import AvailableAppLicense from "./AvailableAppLicense";
import RecurringLicenseStatus from "./RecurringLicenseStatus";
import PurchasedLicenses from "./PurchasedLicenses";
import RangeLicense from "./RangeLicense";

const ChartReport = () => {
  return (
    <div className="container_chart">
      <h1>Chart Report</h1>
      <div className="report_chart">
        <PurchasedLicenses />
        <RecurringLicenseStatus/>
      </div>
      <div className="report_chart">
        <LicenseStatus/>
        <AvailableAppLicense />
      </div>
      <div className="report_chart">
        <RangeLicense/>
      </div>
    </div>
  );
};

export default ChartReport;
