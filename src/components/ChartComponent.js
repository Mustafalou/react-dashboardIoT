// ChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

const ChartComponent = ({ data }) => {
  if (data.length === 0) {
    return <div>No data available</div>;
  }
  const firstTimestamp = data.length > 0 ? data[0].timestamp : new Date().toISOString();
  const lastTimestamp = data.length > 0 ? data[data.length - 1].timestamp : new Date().toISOString();

  const chartData = {
    datasets: [
      {
        label: 'MQTT Data',
        data: data.map((d) => ({
          x:new Date(d.timestamp),
          y: d.message,
        })), // Ensure this is a numeric array
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time', // Use time scale for x-axis,
        time: {
          unit: 'minute', // Display time in minutes
          displayFormats: {
            minute: 'HH:mm', // Display time in hours and minutes
          },
        },
        Ticks: {
          source: 'auto',
          autoSkip: true,
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
        min: 0, // Set the minimum y-axis value
        max: 100, // Set the maximum y-axis value
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ChartComponent;
