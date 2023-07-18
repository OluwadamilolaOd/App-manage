import React, { useEffect, useState } from 'react'
import './card.css';
import Card from './Card'
import { baseUrl } from '../../Hook/baseurl';

const CardList = () => {

  //fetch data from api
 const [data, setData] = useState("");
 const [loading, setLoading] = useState(true);


  useEffect(() => { 
    const fetchData = async () => {
      try {
      const response = await fetch(`${baseUrl}/Report/AllReport`);
        const data = await response.json();
        console.log(data);
        setData(data);
        setLoading(!loading);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='card-container'>
        <Card title={"Number of Organisations"} value={data.organization} className = {"redBackg"} />
        <Card title={"Number of Licenses"} value={data.purchasedLicense} className = {"greenBackg"} />
        <Card title={"Number of Licenses due to Expire This Month and Next Month"} value={100} className = {"blueBackg"} />
        <Card title={"Number of Expired Licenses"} value={data.expiredlicense} className = {"orangeBackg"} />
        <Card title={"Number of Active License"} value={data.activeLicense} className = {"yellowBackg"} />
        <Card title={"Number of New License"} value={data.application} className = {"blueBackg"} />
        {/* <Card title={"Number of Renew"} value={100} className = {"greenBackg"} />
        <Card title={"Number of Organisations"} value={100} className = {"blueBackg"} />
        <Card title={"Number of Organisations"} value={100} className = {"orangeBackg"} /> */}
    </div>
  )
}

export default CardList