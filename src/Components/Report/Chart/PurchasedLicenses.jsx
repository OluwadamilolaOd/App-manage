import React from 'react'
import Chart from "react-apexcharts";


const PurchasedLicenses = () => {
  const barData = {
    series: [
      {
        name: "Licenses",
        data: [8, 3, 1],
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
        categories: ["STAAS Desktop", "KwikAlert", "(Blank)"],
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
