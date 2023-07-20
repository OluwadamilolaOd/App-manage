import React from "react";
import Chart from "react-apexcharts";

const AvailableAppLicense = () => {
  const barData = {
    series: [
      {
        name: "App Licenses",
        data: [3, 1, 1, 1, 1, 1],
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
        categories: [
          "MyPayCheq",
          "All Friday",
          "KwikAlert",
          "STAAS Desktop",
          "Test License",
          "Vlogin",
        ],
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
