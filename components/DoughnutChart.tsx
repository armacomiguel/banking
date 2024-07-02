"use client";

import {Chart as ChartJS, ArcElement, Tooltip, Legend, plugins} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data= {
        datasets: [
            {
                label: 'Bancos',
                data: [123,444,543],
                backgroundColor: ['#0747b6' ,'#2265d8','#2291fa']
            }
        ],
        labels : ['Banco 1', 'Banco 2', 'Banco 3']
    }
  return <Doughnut data={data}
    options={{
        cutout: '60%',
        plugins: {
            legend: {
                display: false
            }
        }
    }}
  />
}

export default DoughnutChart;