import {useState, useEffect} from 'react'
import Banner from '../../components/Banner'
import { useNavigate } from 'react-router-dom'
import TableSheet from '../../components/Table/TableSheet';
import {baseUrl} from './../../Hook/baseurl';
import Pagination from '../../components/Pagination';

const License = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const url = `${baseUrl}/AppLicense`
  const headers = ["Name","Description"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let completeData = Object.values(data);
            setData(completeData);
            setLoading(!loading)
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  const handleEventClick = () => {
    navigate("addNewLicense")
  }
  return (
    <div>
      <Banner title={"Manage License"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add New License"} btnEventHandler={handleEventClick} />
      <TableSheet headers={headers} data={data} loading={loading} />
      <Pagination url={url} setcompleteData={setData} />
    </div>
  )
}

export default License
