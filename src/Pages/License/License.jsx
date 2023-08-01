import {useState, useEffect} from 'react'
import Banner from '../../Components/Banner'
import { useNavigate } from 'react-router-dom'
import TableSheet from '../../Components/Table/TableSheet';
import {baseUrl} from './../../Hook/baseurl';
import Pagination from '../../Components/Pagination';
import Search from '../../Components/Search';
import Error500 from '../../Components/Error/Error500';
import { useGetItemsQuery } from '../../Redux/GetItems';
import Loader from '../../Components/Loader';

const License = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMess, setErrorMess] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFilteredData, setIsFilteredData] = useState(false);
  //get token from local storage and set it to state
  const token =localStorage.getItem("token")
  
  const navigate = useNavigate();
  const url = `${baseUrl}/AppLicense`
  const headers = ["Name","Description"]

    const {data: items, isLoading, error: errors} = useGetItemsQuery('/AppLicense');

  //const [data] = useFetch(url);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetch(url,{
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           let completeData = Object.values(data);
  //           setData(completeData);
  //           setLoading(!loading)
  //         });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setErrorMess(error);
  //       setError(true);
  //     }
  //   };

  //   fetchData();
  // }, [url, token]);

  const handleEventClick = () => {
    navigate("addNewLicense")
  }



    //Handle search event
    const handleSearch = (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      if(searchTerm === "") {
        setFilteredData(items);
      }else if(items.length > 0){
        const filteredData = items.filter((value) => 
          value.licenseName.toLowerCase().includes(searchTerm.toLowerCase()) 
          || value.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredData);
        setIsFilteredData(true);
      }
    };

  return (
    <div>
      <Banner title={"Manage License"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add New License"} btnEventHandler={handleEventClick} />
      <Search handleSearch = {handleSearch} value={searchTerm} placeholder="Search for License" />
      {/* {error ? <Error500 />:<TableSheet headers={headers} data={isFilteredData ? filteredData : data} loading={loading} />} */}
      {errors ? <Error500 />: isLoading? <Loader/> :<TableSheet headers={headers} data={isFilteredData ? filteredData : items}/>}
      <Pagination url={url} setData={items} />
    </div>
  )
}

export default License
