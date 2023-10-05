import {useState, useEffect} from 'react'
import Chart from "react-apexcharts";
import { baseUrl } from '../../../Hook/baseurl';

const RecurringLicenseStatus = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchData = async () => {
      try {
      const response = await fetch(`${baseUrl}/Report/LicenseStatusCount`);
        const data = await response.json();
        setData(data);
        setLoading(!loading);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(data)

  const donutData =[ 
    {
      name: 'New License', 
      y: data.activeLicense
    },
    {
      name: 'Recurring License', 
      y: data.expiredLicense
    },
  ];
  const options = {
    chart: {
      type:'donut',
    },
    title: {
      text: "Recurring License Status",
    },
    colors: ["#000066", "#DA2929"],
    labels: ["New License", "Recurring License"],

    // labels: donutData.map((dataPoint) => dataPoint),
  };

  return (
    <div className="chart-bar">
       <Chart
        options={options}
        series={donutData.map((dataPoint)=> dataPoint.y)}
        type="donut"
        height={350}
      />
  </div>
  )
}

export default RecurringLicenseStatus
