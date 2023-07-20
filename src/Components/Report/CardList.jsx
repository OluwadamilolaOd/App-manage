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
        <Card title={"Number of Organisations"} value={data.organization} className = {"blueBackg"} />
        <Card title={"Number of Licenses"} value={data.purchasedLicense} className = {"blueBackg"} />
        {/* <Card title={"Number of Licenses due to Expire This Month and Next Month"} value={100} className = {"blueBackg"} /> */}
        <Card title={"Number of Expired Licenses"} value={data.expiredlicense} className = {"redBackg"} />
        <Card title={"Number of Active License"} value={data.activeLicense} className = {"blueBackg"} />
        <Card title={"Number of New License"} value={data.application} className = {"blueBackg"} />
    </div>
  )
}

export default CardList