import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


export default Analytics;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';

// const SalesVisualization = () => {
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     fetchSalesData();
//   }, []);

//   const fetchSalesData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/sales');
//       setSalesData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Prepare data for bar chart
//   const prepareChartData = () => {
//     const productQuantity = {
//       electronics: 0,
//       accessories: 0,
//       clothes: 0,
//     };

//     salesData.forEach((sale) => {
//       const { product, quantity } = sale;
//       if (productQuantity[product]) {
//         productQuantity[product] += parseInt(quantity, 10);
//       }
//     });

//     const labels = Object.keys(productQuantity);
//     const data = Object.values(productQuantity);
//     const colors = [
//       'rgba(75, 192, 192, 0.6)',
//       'rgba(54, 162, 235, 0.6)',
//       'rgba(255, 99, 132, 0.6)',
//     ];

//     return {
//       labels,
//       datasets: [
//         {
//           label: 'Product Quantity',
//           data,
//           backgroundColor: colors,
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <div className="sales-visualization-container">
//       <h2>Sales Data Visualization</h2>
//       <SalesChart data={prepareChartData()} />
//     </div>
//   );
// };

// const SalesChart = ({ data }) => {
//   const options = {
//     indexAxis: 'y',
//     elements: {
//       bar: {
//         borderWidth: 2,
//       },
//     },
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// export default SalesVisualization;
