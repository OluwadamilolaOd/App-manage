import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import { baseUrl } from '../../../Hook/baseurl';


const PurchasedLicenses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchData = async () => {
      try {
      const response = await fetch(`${baseUrl}/Report/barchat`);
        const data = await response.json();
        setData(data.result);
        setLoading(!loading);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

    const licenseNames = [];
    const licenseCount = [];

    for (const item of data) {
      licenseNames.push(item.licenseName);
      licenseCount.push(item.licenseCount);
    }

  const barData = {
    series: [
      {
        name: "Licenses",
        data: licenseCount,
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ["#000066"],
      xaxis: {
        categories: licenseNames,
      },
      title: {
        text: "Purchased Licenses",
      },
      chart: {
        stacked: true,
      },
    },
  };
  return (
    <div className="chart-bar">
        <Chart
        options={barData.options}
        series={barData.series}
        type="bar"
        height={350}
      />
  </div>
  )
}

export default PurchasedLicenses
