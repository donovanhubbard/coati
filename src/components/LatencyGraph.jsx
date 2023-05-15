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

const LatencyGraph = ({responses}) => {

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
      // legend: {
      //   position: 'top',
      // },
      title: {
        display: true,
        text: 'Response Time (ms)',
      },
    },
  };

  let dataset = [];
  let labels = [];

  if (responses){
    dataset = responses.map((response) => response.time); 
    labels = responses.map((response) => response.formattedTime);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'google.com',
        data: dataset,
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
    
  };

  return (
    <Line data={data} options={options} />
  );
}

export default LatencyGraph;