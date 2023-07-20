import React from 'react'
import Chart from "react-apexcharts";

const RecurringLicenseStatus = () => {
  const donutData =[ 
    {
      name: 'New License', 
      y: 44
    },
    {
      name: 'Recurring License', 
      y: 55
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
    {/* <Chart
      type="donut"
      width={600}
      height={400}
      series={[44, 55]}
      options={{
        labels: ["New License", "Recurring License"],
        title: {
          text: "Recurring License Status",
        },
        colors: ["#000066", "#DA2929"],
      }}
    ></Chart> */}
  </div>
  )
}

export default RecurringLicenseStatus
