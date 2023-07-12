import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../../Components/ArrowBack";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";
import OrgPurchasedLicsTableSheet from "./OrgPurchasedLicsTableSheet";
import "./../../Pages/Styles/organization.css";
import Pagination from "../../Components/Pagination";
import {
  MdOutlineEdit,
  MdDeleteOutline,
} from "react-icons/md";
import Button from "../../Components/Button"
import Modal from "../../Components/Modal/Modal";

const OrganizationProfile = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const userParams = useParams();
  const paramsValue = Object.values(userParams);
  const orgProfileUrl = `${baseUrl}/Organizations/${paramsValue}`;
  const orgLicense = `${baseUrl}/PurchasedLicense/ByOrganizationId/${paramsValue}`;
  const token = localStorage.getItem("token");
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
          fetch(orgProfileUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }),
          fetch(orgLicense, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }),
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log(data1)
        setTableData(data2);
        setLoading(!loading);
        await fetch(orgProfileUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        })
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


  //Delete License Type

  const deleteItem = (itemId) => {
    fetch(`${baseUrl}/purchasedlicense/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      if (response.ok) {
        // Update the state by removing the deleted item
        setTableData(tableData.filter(item => item.id !== itemId));
      } else {
        // Handle error if the item deletion was unsuccessful
        console.error('Error deleting item');
      }
    })
    .catch(error => {
      // Handle network or other errors
      console.error('Error:', error);
    });
  };

  const handleEventClick = () => {
    navigate("/addorganizationLicense", {state:{data:data}});
  };
  const handleEditOrg = () => {
    navigate("organizations/editorganization")
  }

  const handleArchive = () => {
    deleteItem(data.id)
    setOpenModal(false)
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
              <div className="profile-action" onClick={handleEditOrg}>
                <MdOutlineEdit />
                <span>Edit</span>
              </div>
              <div className="profile-action color-red" onClick={() => {
                setOpenModal(true);
              }}>
                <MdDeleteOutline/>
                <span>Archive</span>
              </div>
              {openModal && <Modal 
                    setOpenModal={setOpenModal}
                    header={"Archive License"}
                   // image={archiveIcon}
                    btnAction={"Archive"}
                    title= {data.organizationName}
                    description={"Are you sure you want to archive?"}
                    handleOnclickEvent={handleArchive} />
                }
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
          deleteItem = {deleteItem}
        />
      </div>
      <Pagination url={orgLicense} setcompleteData={setTableData} />
    </div>
  );
};

export default OrganizationProfile;