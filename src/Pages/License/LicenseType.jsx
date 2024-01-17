import React, { useState, useEffect } from "react";
import Banner from "../../Components/Banner";
import { baseUrl } from "../../Hook/baseurl";
import { useNavigate, useParams } from "react-router-dom";
import TableAction from "../../Components/Table/TableAction";
import { ToastContainer} from "react-toastify";
import { notifyError, notifySuccess } from "../../Components/ReactToastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../Components/Pagination";
import Search from "../../Components/Search";

const LicenseType = () => {
  const navigate = useNavigate();
  const userParams = useParams();
  const [data, setData] = useState();
  const [completeData, setcompleteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFilteredData, setIsFilteredData] = useState(false);
  const paramsValue = Object.values(userParams);
  const url = `${baseUrl}/licenseType/license/${paramsValue}`;
  const headers = [
    "Band Type",
    "Maximum User",
    "Part Number",
    "Status",
    "Action",
  ];
  const mainUrl = `${baseUrl}/applicense/${paramsValue}`;
  useEffect(() => {
    fetchData();
  }, [mainUrl, url]);

  //get token from local storage and set it to state
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const [response1, response2] = await Promise.all([
        fetch(mainUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);
      const data1 = await response1.json();
      const data2 = await response2.json();
      setData(data1);
      setcompleteData(data2);
      setFilteredData(data2);
      setLoading(!loading);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Delete License Type

  const deleteItem = (itemId) => {
    fetch(`${baseUrl}/licenseType/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Update the state by removing the deleted item
          setcompleteData(completeData.filter((item) => item.id !== itemId));
          notifySuccess("License Band deleted successfully");
        } else {
          // Handle error if the item deletion was unsuccessful
          notifySuccess();
        }
      })
      .catch((error) => {
        // Handle network or other errors
        notifyError(error.message);
        // console.error('Error:', error);
      });
  };

  //Handle search event
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredData(completeData);
    } else if (completeData) {
      const filteredData = completeData.filter(
        (value) =>
          value.licenseBand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          value.maximumUser == searchTerm.toLowerCase() ||
          value.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          value.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData);
      setIsFilteredData(true);
    }
  };

  const handleEventClick = () => {
    navigate("/license/addLicenseBand", {
      state: { paramsValue: paramsValue },
    });
  };

  return (
    <div>
      <Banner
        title={` ${data ? data.licenseName : ""} License`}
        isbtn={true}
        btnClassname={"btnwhite"}
        btntitle={"Add License Band"}
        btnEventHandler={handleEventClick}
      />
      <Search
        handleSearch={handleSearch}
        value={searchTerm}
        placeholder="Search for License Band"
      />
      <TableAction
        headers={headers}
        data={isFilteredData ? filteredData : completeData}
        loading={loading}
        deleteItem={deleteItem}
      />
      <Pagination
        url={url}
        setData={isFilteredData ? setFilteredData : setcompleteData}
      />
      <ToastContainer />
    </div>
  );
};

export default LicenseType;
