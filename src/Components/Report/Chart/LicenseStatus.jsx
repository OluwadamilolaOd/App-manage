import React from 'react'
import Chart from "react-apexcharts";


const LicenseStatus = () => {
  return (
    <div className="chart-bar">
      <Chart
        type="bar"
        width={600}
        height={400}
        series={[
          {
            name: "Licenses",
            data: [11, 1],
          },
        ]}
        options={{
          title: {
            text: "Licenses Status",
          },
          chart: {
            stacked: true,
          },
          xaxis: {
            categories: ["Active", "Expired"],
          },
          colors: ["#000066", "#DA2929"],
        }}
      ></Chart>
    </div>
  )
}

export default LicenseStatus
