import {useState, useEffect} from "react";
import Chart from "react-apexcharts";
import { baseUrl } from '../../../Hook/baseurl';

const AvailableAppLicense = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchData = async () => {
      try {
      const response = await fetch(`${baseUrl}/Report/availablelicense`);
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
        name: "App Licenses",
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
        text: "Available App Licenses",
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
  );
};

export default AvailableAppLicense;
