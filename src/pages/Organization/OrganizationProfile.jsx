import { useState, useEffect } from "react";
import TableAction from "../../components/Table/TableAction";
import { organizationProfileData } from "../../assets/data/organizationProfileData";
import ArrowBack from "../../components/ArrowBack";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";
import OrgPurchasedLicsTableSheet from "./OrgPurchasedLicsTableSheet";

const OrganizationProfile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const userParams = useParams();
  const paramsValue = Object.values(userParams);
  const orgProfileUrl = `${baseUrl}/Organizations/${paramsValue}`;
  const orgLicense = `${baseUrl}/PurchasedLicense/ByOrganizationId/${paramsValue}`;
  const headers = [
    "License Name",
    "Band Type",
    "Max. User",
    "Part Number",
    "Period",
    "Start Date",
    "Exp. Date",
    "Action",
  ];
  const handleBackArrow = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(orgProfileUrl),
          fetch(orgLicense),
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();
        setTableData(data2);
        setLoading(!loading);
        await fetch(orgProfileUrl)
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [orgProfileUrl]);

  return (
    <div>
      <ArrowBack handleBackArrow={handleBackArrow} />
      <div>
        <div>
          <h1>{data.organizationName}</h1>
          
          <h1>{data.email}</h1>
          <h1>{data.address}</h1>
        </div>
        <OrgPurchasedLicsTableSheet
          data={tableData}
          headers={headers}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default OrganizationProfile;
