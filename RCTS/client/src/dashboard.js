import React from 'react';
import './dashboard.css'
function Dashboard() {
  return (
    <div className="w3-container">
      <div className="w3-card-4" style={{ width: '50%' }}>
        <div className="w3-row">
          <div className="w3-col s6">
            <img
              src="https://assets-global.website-files.com/59e16042ec229e00016d3a66/616729f861ac2e51c361c33c_1100x550%20(2).gif"
              alt="Alps"
              style={{ width: '100%' }}
            />
          </div>
          <div className="w3-col s6">
          <p style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '1.4' }}>
  Create a form on the home page to input sales data for different products. Upon submission, send the data to the backend (Node.js) to store it in a database (MongoDB) using Mongoose or any preferred method. Retrieve the stored sales data and analyze it to calculate total sales and percentages for each product category (accessories, electronics, clothes). Pass the processed data to the frontend (React) and use a charting library like Chart.js or D3.js to create a pie chart. Configure the chart to represent the top three products with distinct colors. Integrate the pie chart into the home page, style it to be visually prominent, and use concise text to explain its significance and the top-selling products.
</p>

          </div>
        </div>
        {/* <div className="w3-container w3-center">
          <p>The Italian / Austrian Alps</p>
        </div> */}
      </div>
      <div className="w3-card-4" style={{ width: '50%' }}>
        <div className="w3-row">
        <div className="w3-col s6">
        <p style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '1.4' }}>
  Create a form to upload an Excel file, allowing users to select columns (education, working place, occupation) for visualization. Send the file to the backend (Node.js) using a file input field. Parse the Excel file in the backend using libraries like xlsx or csv-parser. Store the data in MongoDB using Mongoose. Retrieve the selected columns from the database. Analyze the data to calculate relevant metrics. Integrate a bar graph component into the React frontend. Render the graphs based on the selected columns and analyzed data. Style the home page with visually appealing graphs and provide contextual headings to explain the significance of the visualized data.
</p>


          </div>
          <div className="w3-col s6">
            <img
              src="https://blogs.perficient.com/files/iStock-822845878-1-600x400.jpg"
              alt="Alps"
              style={{ width: '100%' }}
            />
          </div>
          
        </div>
        {/* <div className="w3-container w3-center">
          <p>The Italian / Austrian Alps</p>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
