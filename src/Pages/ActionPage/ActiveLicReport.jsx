import {useState,useEffect} from "react";
import { baseUrl } from "../../Hook/baseurl";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import ReportTableSheet from "../../Components/Table/ReportTableSheet";
import Pagination from "../../Components/Pagination";
import Error500 from "../../Components/Error/Error500";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../Components/ReactToastify";

const ActiveLicReport = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFilteredData, setIsFilteredData] = useState(false);
  const url = `${baseUrl}/purchasedLicense/AllActiveLicenses`;

  const headers = [
    "Organization",
    "License Name",
    "Band Type",
    "Max. User",
    "Start Date",
    "Exp. Date",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
          .then((response) => response.json())
          .then((data) => {
            let completeData = Object.values(data);
            setData(completeData);
            setFilteredData(completeData);
            setLoading(!loading)
          });
      } catch (error) {
        notifyError(error.message);
        setError(true);
      }
    };

    fetchData();
  }, [url]);


      //Handle search event
      const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        if(searchTerm === "") {
          setFilteredData(data);
        }else if(data){
          const filteredData = data.filter((value) => 
            value.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) 
            || value.licenseName.toLowerCase().includes(searchTerm.toLowerCase())
            || value.licenseBand.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredData(filteredData);
          setIsFilteredData(true);
        }
      };

  return (
    <div>
      <Banner title={"Active License"} />
      <Search handleSearch = {handleSearch} value={searchTerm} placeholder="Search for Active License" />
      {error ? <Error500 /> :<ReportTableSheet headers={headers} data={isFilteredData? filteredData: data} loading={loading}/>}
      <Pagination url={url} setData={isFilteredData ? setFilteredData : setData}/>
      <ToastContainer />
    </div>
  );
};

export default ActiveLicReport;
