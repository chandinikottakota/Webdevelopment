import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './analytics.css';

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sales') // Update the endpoint if necessary
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const prepareChartData = () => {
    const labels = data.map((product) => product.product);
    const quantities = data.map((product) => product.quantity);
    const colors = ['#ff0000', '#00ff00', '#0000ff'];

    return {
      labels: labels,
      datasets: [
        {
          data: quantities,
          backgroundColor: colors.slice(0, quantities.length),
        },
      ],
    };
  };

  return (
    <div className="piechart-container">
      <h2>Pie Chart</h2>
      {data.length > 0 ? (
        <Pie data={prepareChartData()} />
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default PieChart;
