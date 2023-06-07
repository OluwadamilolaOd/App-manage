import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableAction from "../../components/Table/TableAction";
import { organizationProfileData } from "../../assets/data/organizationProfileData";
import ArrowBack from "../../components/ArrowBack";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";
import OrgPurchasedLicsTableSheet from "./OrgPurchasedLicsTableSheet";
import Button from "../../components/Button";
import "./../../components/Styles/organization.css";

const OrganizationProfile = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const userParams = useParams();
  const paramsValue = Object.values(userParams);
  const orgProfileUrl = `${baseUrl}/Organizations/${paramsValue}`;
  const orgLicense = `${baseUrl}/PurchasedLicense/ByOrganizationId/${paramsValue}`;
  const headers = [
    "License Name",
    "Band Type",
    "Maximum User",
    "Part Number",
    "Start Date",
    "Expiration Date",
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
        console.log(data2);
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

  const handleEventClick = () => {
    navigate("")
  }

  return (
    <div>
      <ArrowBack handleBackArrow={handleBackArrow} />
      <div>
        <div className="orgProfile">
          <div className="profileOrg">
            <div>
              <h1 className="profileName">{data.organizationName}</h1>
            </div>
            <div>
              A B{/* <Button  btnClassname={"btnborder"} btntitle={"Edit"}/> */}
              {/* <Button  btnClassname={"btnBorder"} btntitle={"Archive"}/> */}
            </div>
          </div>
          <div className="genInfo">
            <h3>General Information</h3>
            <div className="info">
              <div className="dataInfo">
                <div>
                  <p className="text">Email Address</p>
                </div>
                <div>
                  <p className="textB">{data.email}</p>
                </div>
              </div>
              <div className="dataInfo">
                <div>
                  <p className="text">location</p>
                </div>
                <div>
                  <p className="textB">{data.address}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="licInfo">
            <div>
              <h3>Licensing Information</h3>
            </div>
            <div>
              <Button btnClassname={"btnblue"} btntitle={"Edit"} btnEventHandler={handleEventClick}/>
            </div>
          </div>
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
