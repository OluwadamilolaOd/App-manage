import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Banner from '../../Components/Banner';
import { baseUrl } from '../../Hook/baseurl';
import OrgTableSheet from './OrgTableSheet';
import Pagination from '../../Components/Pagination';

const Organizations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `${baseUrl}/Organizations`
  const headers = ["Company Name", "Email Address", "Phone Number", "Location"]
  const navigate = useNavigate();

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
    navigate("/organizations/addOrganization")
  }

  return (
    <div>
      <Banner title={"Manage Organization"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add Organization"} btnEventHandler={handleEventClick}/>     
      <OrgTableSheet headers={headers} navigateTo={"/organizationProfile"} items={data} loading={loading}/>
      <Pagination url={url} setcompleteData={setData} />
    </div>
  )
}

export default Organizations
