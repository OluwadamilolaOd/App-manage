import {useState, useEffect} from 'react'
import Banner from '../../Components/Banner'
import { useNavigate } from 'react-router-dom'
import TableSheet from '../../Components/Table/TableSheet';
import {baseUrl} from './../../Hook/baseurl';
import Pagination from '../../Components/Pagination';
import Search from '../../Components/Search';

const License = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  //get token from local storage and set it to state
  const token =localStorage.getItem("token")
  
  const navigate = useNavigate();
  const url = `${baseUrl}/AppLicense`
  const headers = ["Name","Description"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
      }
    };

    fetchData();
  }, [url, token]);

  const handleEventClick = () => {
    navigate("addNewLicense")
  }


  //Handle search event
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if(searchTerm === "") {
      setFilteredData(data);
    }else if(data){
      const filteredData = data.filter((value) => value.licenseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  };

  return (
    <div>
      <Banner title={"Manage License"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add New License"} btnEventHandler={handleEventClick} />
      <Search handleSearch = {handleSearch} value={searchTerm} />
      <TableSheet headers={headers} data={filteredData} loading={loading} />
      <Pagination url={url} setcompleteData={setData} />
    </div>
  )
}

export default License
