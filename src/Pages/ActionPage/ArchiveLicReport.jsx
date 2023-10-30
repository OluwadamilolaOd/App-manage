import {useState,useEffect} from "react";
import { baseUrl } from "../../Hook/baseurl";
import Banner from "../../Components/Banner";
import Search from "../../Components/Search";
import ReportTableSheet from "../../Components/Table/ReportTableSheet";
import Pagination from "../../Components/Pagination";
import Error500 from "../../Components/Error/Error500";

const ArchiveLicReport = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFilteredData, setIsFilteredData] = useState(false);
  const url = `${baseUrl}/purchasedLicense/AllArchivedLicenses`;

  const headers = [
    "License Name",
    "Band Type",
    "Max. User",
    "Organization",
    "Start Date",
    "Exp.Date",
    "Action",
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
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div>
      <Banner title={"Archive License"} />
      <Search placeholder="Search for Archive License" />
      {error ? <Error500 /> :<ReportTableSheet headers={headers} data={isFilteredData? filteredData: data} loading={loading}/>}
      <Pagination />
    </div>
  );
};

export default ArchiveLicReport;
