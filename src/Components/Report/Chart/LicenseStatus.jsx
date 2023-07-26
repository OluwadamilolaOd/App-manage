import React from 'react'
import Chart from "react-apexcharts";


const LicenseStatus = () => {
  const barData = {
    series:[
      {
        name: "Licenses",
        data: [11, 2],
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
