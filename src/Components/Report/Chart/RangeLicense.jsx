import React from "react";
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';

const RangeLicense = () => {
  const timelineData = [
    {
      x: "MyPaycheq",
      y: [
        new Date('2023-01-19').getTime(),
        new Date('2023-07-19').getTime(),
      ],
    },
    {
      x: "All Friday",
      y: [
        new Date('2023-01-19').getTime(),
        new Date('2023-04-02').getTime(),
      ],
    },
    {
      x: 'KwikAlert',
      y: [
        new Date('2023-03-04').getTime(),
        new Date('2023-04-20').getTime()
      ]
    },
    {
      x: 'STASS Desktop',
      y: [
        new Date('2022-05-08').getTime(),
        new Date('2023-08-12').getTime()
      ]
    },
    {
      x: 'Test License',
      y: [
        new Date('2023-02-02').getTime(),
        new Date('2023-03-30').getTime()
      ]
    },
    {
      x: 'Vlogin',
      y: [
        new Date('2023-02-15').getTime(),
        new Date('2025-04-18').getTime()
      ]
    }
    // Add more data points as needed
  ];

  const options = {
    chart: {
      type: "rangeBar",
    },
    title: {
      text: "License Range ",
    },
    colors:['#000066'],
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
  
    
  };
  return (
    <div className="chart-bar">
      <Chart
        options={options}
        series={[{ data: timelineData }]}
        type="rangeBar"
        height={350}
      />
    </div>
  );
};

export default RangeLicense;
