import React from "react";
import Chart from "react-apexcharts";
import { Tooltip } from 'chart.js';

const bar = () => {
  return (
    <div className="chart-container">
      <Chart
        type="bar"
        width={600}
        height={600}
        series={[44, 55]}
        options={{
          labels: ["New License", "Recurring License"],
          tooltip: {
            y: {
              formatter: (val) => {
                return "$$(val)";
              },
            },
          },
          title: {
            text: "Recurring License Status",
          },
          colors: ["#000066", "#DA2929"],
        }}
      ></Chart>
    </div>
  );
};

export default bar;
