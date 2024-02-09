import { Tooltip } from "chart.js";
import React from "react";
import Chart from "react-apexcharts";

const DonutChart = () => {
  return (
    <div className="chart-donut">
      <Chart
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
      ></Chart>
    </div>
  );
};

export default DonutChart;
