import React from 'react'
import Chart from "react-apexcharts";


const PurchasedLicenses = () => {
  return (
    <div className="chart-bar">
    <Chart
      type="bar"
      width={600}
      height={400}
      series={[
        {
          name: "Licenses",
          data: [8, 3, 1],
        },
      ]}
      options={{
        title: {
          text: "Purchased Licenses",
        },
        chart: {
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: ["STAAS Desktop", "KwikAlert", "(Blank)"],
        },
        colors: ["#000066"],
      }}
    ></Chart>
  </div>
  )
}

export default PurchasedLicenses
