import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import chart.js/auto for automatic import of all necessary chart types and scales

const ChartComponent = ({ chartData }) => {
  const data = {
    labels: chartData.labels || [],
    datasets: [
      {
        label: 'Quantity Level',
        backgroundColor: 'rgba(124, 32, 124, 1)', // Change the color here
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)', // Change the hover color here
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: chartData.quantityData || []
      }
    ]
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Bar
        data={data}
        options={{
          scales: {
            y: {
              type: 'linear',
              ticks: {
                beginAtZero: true
              }
            }
          }
        }}
      />
    </div>
  );
}

export default ChartComponent;
