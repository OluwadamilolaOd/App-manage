import React from 'react'
import Chart from "react-apexcharts";

const AvailableAppLicense = () => {
  return (
    <div className="chart-bar">
    <Chart
      type="bar"
      width={600}
      height={400}
      series={[
        {
          name: "App Licenses",
          data: [3, 1, 1, 1, 1, 1],
        },
      ]}
      options={{
        title: {
          text: "Available App Licenses",
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
          categories: ["MyPayCheq", "All Friday", "KwikAlert", "STAAS Desktop", "Test License", "Vlogin"],
        },
        colors: ["#000066"],
      }}
    ></Chart>
  </div>
  )
}

export default AvailableAppLicense
