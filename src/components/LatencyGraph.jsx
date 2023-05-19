import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const LatencyGraph = ({hostObjs}) => {

  let colorIndex = 0;
  const colors = [ 
    {border: 'rgba(255, 99, 132)', background: 'rgba(255, 99, 132, .5)'},
    {border: 'rgba(54, 162, 235)', background: 'rgba(54, 162, 235, .5)'},
    {border: 'rgba(255, 206, 86)', background: 'rgba(255, 206, 86, .5)'},
  ];
  const nextColor = () => {
    const color = colors[colorIndex];
    colorIndex++;
    if (colorIndex >= colors.length) {
      colorIndex = 0;
    }
    return color;
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  const options = {
    responsive: true,
    scales: {
      y: {
          beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Response Time (ms)',
      },
    },
  };

  let datasets = [];
  let labels = [];

  
  if (hostObjs.length > 0) {
    labels = hostObjs[0].pings.map((response) => response.formattedTime);
    hostObjs.forEach((hostObj) => {
      const color = nextColor();
      datasets.push({
        label: hostObj.displayName,
        data: hostObj.pings.map((response) => response.time),
        borderColor: color.border,
        backgroundColor: color.background,
      });    
    });
  }

  const data = {
    labels: labels,
    datasets 
  };

  return (
    <Line data={data} options={options} />
  );
}

export default LatencyGraph;