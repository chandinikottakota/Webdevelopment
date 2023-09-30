// import React, { useState, useEffect } from 'react';
// import Chart from 'chart.js';
// import './dataingestion.css';

// const SalesTeamForm = () => {
//   const [name, setName] = useState('');
//   const [product, setProduct] = useState('');
//   const [date, setDate] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     // Fetch data from the backend and populate the form
//     fetch('http://localhost:5000/api/sales')
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error('Failed to fetch sales data');
//         }
//       })
//       .then((data) => {
//         setName(data.name);
//         setProduct(data.product);
//         setDate(data.date);
//         setQuantity(data.quantity);
//         generateChart(data);
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   }, []);

//   const generateChart = (data) => {
//     const labels = data.map((item) => item.product);
//     const quantities = data.map((item) => item.quantity);

//     // Generate pie chart
//     new Chart('salesChart', {
//       type: 'pie',
//       data: {
//         labels,
//         datasets: [
//           {
//             data: quantities,
//             backgroundColor: [
//               '#FF6384',
//               '#36A2EB',
//               '#FFCE56',
//               '#8CFF7A',
//               '#FF8A8A',
//               '#5E64FF',
//             ],
//           },
//         ],
//       },
//     });

//     // Generate bar graph
//     new Chart('salesGraph', {
//       type: 'bar',
//       data: {
//         labels,
//         datasets: [
//           {
//             label: 'Sales Quantity',
//             data: quantities,
//             backgroundColor: '#36A2EB',
//             borderColor: '#36A2EB',
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   };

//   // Rest of the code...
//   return (
//     <div className="sales-team-form-container">
//       {error && <div className="error-message">{error}</div>}
//       {successMessage && <div className="success-message">{successMessage}</div>}
//       <div className="file-upload-container">
//         <h3>Uploaded File:</h3>
//         <form onSubmit={handleExcelSubmit}>
//           <label>Upload Excel File:</label>
//           <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} required />
//           <button type="submit" className="save-button">
//             Save Excel
//           </button>
//         </form>
//       </div>
//       <div className="form-container">
//         <h2>Sales Team Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Customer Name:</label>
//             <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label>Product Name:</label>
//             <select value={product} onChange={(event) => setProduct(event.target.value)} required>
//               <option value="">Select a category</option>
//               <option value="electronics">Electronics</option>
//               <option value="accessories">Accessories</option>
//               <option value="clothes">Clothes</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Sales Date:</label>
//             <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label>Quantity:</label>
//             <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} required />
//           </div>
//           <button type="submit" className="save-button">
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SalesTeamForm;





import React, { useState, useEffect } from 'react';
import './dataingestion.css';

const SalesTeamForm = () => {
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend and populate the form
    fetch('http://127.0.0.1:5000/api/sales')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch sales data');
        }
      })
      .then((data) => {
        if (data.length > 0) {
          const latestSalesData = data[data.length - 1];
          setName(latestSalesData.name);
          setProduct(latestSalesData.product);
          setDate(latestSalesData.date);
          setQuantity(latestSalesData.quantity);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name,
      product,
      date,
      quantity,
    };

    fetch('http://127.0.0.1:5000/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to add sales data');
      })
      .then((data) => {
        setSuccessMessage(data.message);
        setName('');
        setProduct('');
        setDate('');
        setQuantity('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleExcelSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:5000/api/excels', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to add excel data');
      })
      .then((data) => {
        setSuccessMessage(data.message);
        setFile(null);

        // Fetch data from the backend and update the form with new data
        fetch('http://127.0.0.1:5000/api/sales')
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Failed to fetch sales data');
          })
          .then((data) => {
            if (data.length > 0) {
              const latestSalesData = data[data.length - 1];
              setName(latestSalesData.name);
              setProduct(latestSalesData.product);
              setDate(latestSalesData.date);
              setQuantity(latestSalesData.quantity);
            }
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="sales-team-form-container">
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="form-container">
        <h2>Sales Team Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name:</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
          </div>
          <div className="form-group">
            <label>Product Name:</label>
            <select value={product} onChange={(event) => setProduct(event.target.value)} required>
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
              <option value="clothes">Clothes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Sales Date:</label>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(event) => setQuantity(event.target.value)} required />
          </div>
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
      <div className="file-upload-container">
        <h3>Uploaded File:</h3>
        <form onSubmit={handleExcelSubmit}>
          <label>Upload Excel File:</label>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} required />
          <button type="submit" className="save-button">
            Save Excel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SalesTeamForm;
