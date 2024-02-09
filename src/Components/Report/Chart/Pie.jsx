import { Tooltip } from 'chart.js';
import React from 'react'
import Chart from "react-apexcharts";

const Pie = () => {
  return (
    <div className='card-container'>
      <Chart
        type="donut"
        width={600}
        height={600}
        series={[44, 55]}
        options={{
          labels:['New License','Recurring License'],
          tooltip:{
            y:{
              formatter:(val)=>{
                return '$$(val)'
              }
            }
          },
          title:{
            text:'Recurring License Status'
          },
          colors:['#000066', '#DA2929']
        }}
        >
      </Chart>
    </div>
  )
}

export default Pie
