import {useState, useEffect}from 'react'
import Chart from "react-apexcharts";
import { baseUrl } from '../../../Hook/baseurl';


const LicenseStatus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchData = async () => {
      try {
      const response = await fetch(`${baseUrl}/Report/LicenseStatus`);
        const data = await response.json();
        setData(data);
        setLoading(!loading);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

 //console.log(data)

  const barData = {
    series:[
      {
        name: "Licenses",
        data: [data.activeLicense, data.expiredLicense],
      },
    ],
    options: {
      chart: {
        type:'bar',
      },
      plotOptions: {
        bar: {
          distributed: true,
          dataLabels: {
            hideOverflowingLabels:false,
          },
        },
      },
      colors:["#000066", "#DA2929"],
      xaxis: {
        categories: ["Active", "Expired"],
      },
      title: {
        text: "Licenses Status",
      },
      chart: {
        stacked: true,
      },
    },
  }
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

export default LicenseStatus
