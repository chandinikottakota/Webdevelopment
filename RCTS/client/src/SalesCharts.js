import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import './saleschart.css';

const Dashboard = () => {
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/sales');
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();

        const quantities = data.reduce((acc, item) => {
          acc[item.product] = (acc[item.product] || 0) + parseInt(item.quantity);
          return acc;
        }, {});

        const pieData = {
          labels: Object.keys(quantities),
          datasets: [
            {
              data: Object.values(quantities),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        };

        setPieChartData(pieData);

        const responseExcel = await fetch('http://127.0.0.1:5000/api/excels');
        if (!responseExcel.ok) {
          throw new Error('Failed to fetch excel data');
        }
        const excelData = await responseExcel.json();

        const educationColumn = excelData.map((record) => record.EDUCATION);
        const workingPlaceColumn = excelData.map((record) => record.WORKING_PLACE);
        const occupationColumn = excelData.map((record) => record.OCCUPATION);

        const educationCounts = countColumnValues(educationColumn);
        const workingPlaceCounts = countColumnValues(workingPlaceColumn);
        const occupationCounts = countColumnValues(occupationColumn);

        const barDataEducation = {
          labels: ['Post Graduation', 'Inter', 'Graduation', '10th', 'No Education'],
          datasets: [
            {
              label: 'Education',
              data: educationCounts,
              backgroundColor: '#36A2EB',
            },
          ],
        };

        const barDataWorkingPlace = {
          labels: ['city','village','town'],
          datasets: [
            {
              label: 'Working Place',
              data: workingPlaceCounts,
              backgroundColor: '#FFCE56',
            },
          ],
        };

        const barDataOccupation = {
          labels: ['own bussiness','farmer','daily worker','private employ','government employ'],
          datasets: [
            {
              label: 'Occupation',
              data: occupationCounts,
              backgroundColor: '#FF6384',
            },
          ],
        };

        setBarChartData({
          education: barDataEducation,
          workingPlace: barDataWorkingPlace,
          occupation: barDataOccupation,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const countColumnValues = (column) => {
    const counts = column.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
    return Object.values(counts);
  };

  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <h1>Form Data</h1>
        {pieChartData && (
          <div className="chart-item pie-chart-item">
            <div className="chart-box">
              <h2>Pie Chart</h2>
              <div className="chart-content">
                <Pie
                  data={pieChartData}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 15,
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const product = context.label;
                            const quantity = context.parsed;
                            return `${product}: ${quantity} units`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chart-container">
        {barChartData && (
          <div className="chart-item">
            <h1>Excel Data</h1>
            <div className="chart-box">
              <h2>Education Bar Graph</h2>
              <div className="chart-content">
                <Bar
                  data={barChartData.education}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {barChartData && (
          <div className="chart-item">
            <div className="chart-box">
              <h2>Working Place Bar Graph</h2>
              <div className="chart-content">
                <Bar
                  data={barChartData.workingPlace}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {barChartData && (
          <div className="chart-item">
            <div className="chart-box">
              <h2>Occupation Bar Graph</h2>
              <div className="chart-content">
                <Bar
                  data={barChartData.occupation}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
                }  
export default Dashboard;