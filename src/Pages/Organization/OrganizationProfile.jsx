import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../../Components/ArrowBack";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../Hook/baseurl";
import archiveIcon from "../../assets/images/archive_red.png";
import OrgPurchasedLicsTableSheet from "./OrgPurchasedLicsTableSheet";
import "./../../Pages/Styles/organization.css";
import Pagination from "../../Components/Pagination";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal/Modal";
import Search from "../../Components/Search";
import { ToastContainer, toast } from "react-toastify";


const OrganizationProfile = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    navigate("/organizations");
  };

  // react-toastify
  const notifySuccess = () =>
    toast.success("Error deleting item.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("something went wrong", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch(orgProfileUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(orgLicense, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();
        setTableData(data2);
        setFilteredData(data2);
        console.log(data2);
        setLoading(!loading);
        await fetch(orgProfileUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
    fetch(`${baseUrl}/purchasedLicense/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate("/organizations");
          // Update the state by removing the deleted item
          setTableData(tableData.filter((item) => item.id !== itemId));
        } else {
          // Handle error if the item deletion was unsuccessful
          notifySuccess("Error deleting item.");

          // console.error("Error deleting item");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.log(error);
        notifyError(error.message);
        // console.error("Error:", error);
      });
  };

  const handleEventClick = () => {
    navigate("/addorganizationLicense", { state: { data: data } });
  };
  const handleEditOrg = () => {
    navigate("editorganization", { state: { data: data } });
  };

  // const handleArchive = () => {
  //   deleteItem(data.id)
  //   setOpenModal(false)
  // };

  //Handle search event
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredData(tableData);
    } else if (tableData) {
      const filteredData = tableData.filter((value) =>
        value.licenseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData);
    }
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
              {/* <div className="profile-action color-red" onClick={() => {
                setOpenModal(true);
              }}>
                <MdDeleteOutline/>
                <span>Archive</span>
              </div>
              {openModal && <Modal 
                    setOpenModal={setOpenModal}
                    header={"Archive License"}
                    image={archiveIcon}
                    btnAction={"Archive"}
                    title= {data.organizationName}
                    description={"Are you sure you want to archive?"}
                    handleOnclickEvent={handleArchive} />
                } */}
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
            <Button
              className={"btnblue"}
              title={"Add New License"}
              btnEventHandler={handleEventClick}
            />
          </div>

          <Search handleSearch={handleSearch} value={searchTerm} />
        </div>

        <OrgPurchasedLicsTableSheet
          data={filteredData}
          headers={headers}
          loading={loading}
          deleteItem={deleteItem}
        />
      </div>
      <Pagination url={orgLicense} setcompleteData={setTableData} />
      <ToastContainer />

    </div>
  );
};

export default OrganizationProfile;
