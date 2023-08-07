import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../../Components/Banner';
import { baseUrl } from '../../Hook/baseurl';
import OrgTableSheet from './OrgTableSheet';
import Pagination from '../../Components/Pagination';
import Search from './../../Components/Search';
import Error500 from '../../Components/Error/Error500';

const Organizations = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFilteredData, setIsFilteredData] = useState(false);

  const url = `${baseUrl}/Organizations`
  const headers = ["Company Name", "Email Address", "Phone Number", "Location"]
  const navigate = useNavigate();

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

  const handleEventClick = () => {
    navigate("/organizations/addOrganization")
  }

    //Handle search event
    const handleSearch = (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      if(searchTerm === "") {
        setFilteredData(data);
      }else if(data){
        const filteredData = data.filter((value) => 
          value.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) 
          || value.email.toLowerCase().includes(searchTerm.toLowerCase()) 
          || value.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) 
          || value.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredData);
        setIsFilteredData(true);
      }
    };

  return (
    <div>
      <Banner title={"Manage Organization"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add Organization"} btnEventHandler={handleEventClick}/> 
      <Search handleSearch = {handleSearch} value={searchTerm} placeholder="Search for Organization"  />
      {error ? <Error500 /> :<OrgTableSheet headers={headers} navigateTo={"/organizationProfile"} items={isFilteredData? filteredData: data} loading={loading}/>}  
      
      <Pagination url={url} setData={isFilteredData ? setFilteredData : setData} />
    </div>
  )
}

export default Organizations
