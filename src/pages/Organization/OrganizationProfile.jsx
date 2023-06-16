import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableAction from "../../components/Table/TableAction";
import { organizationProfileData } from "../../assets/data/organizationProfileData";
import ArrowBack from "../../components/ArrowBack";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";
import OrgPurchasedLicsTableSheet from "./OrgPurchasedLicsTableSheet";
import "./../../pages/Styles/organization.css";
import Pagination from "../../components/Pagination";
import {
  MdOutlineEdit,
  MdDeleteOutline,
} from "react-icons/md";
import Button from "../../components/Button"

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
    "Max. User",
    "Part Number",
    "Period",
    "Start Date",
    "Exp. Date",
    "Action",
  ];
  const handleBackArrow = () => {
    navigate("/organizations")
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(orgProfileUrl),
          fetch(orgLicense),
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log(data1)
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
    navigate("/addorganizationLicense", {state:{data:data}});
  };

  return (
    <div>
      <ArrowBack handleBackArrow={handleBackArrow} />
      <div>
        <div className="orgProfile">
          <div className="profileOrg">
            <div>
              <h1 className="profileName">{data.organizationName}</h1>
            </div>
            <div className="profile-icon ">
              <div className="profile-action">
                <MdOutlineEdit />
                <span>Edit</span>
              </div>
              <div className="profile-action color-red">
                <MdDeleteOutline/>
                <span>Archive</span>
              </div>
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
            <div className="">
              <h3>Licensing Information</h3>
            </div>
            <Button className={"btnblue"} title={"Add New License"} btnEventHandler={handleEventClick}/>
          </div>
        </div>

        <OrgPurchasedLicsTableSheet
          data={tableData}
          headers={headers}
          loading={loading}
        />
      </div>
      <Pagination url={orgLicense} setcompleteData={setTableData} />
    </div>
  );
};

export default OrganizationProfile;
