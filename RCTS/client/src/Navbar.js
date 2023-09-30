import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar component

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
       
        <li className="navbar-item">
          <Link to="/dataingestion" className="navbar-link">
            Ingestion
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/SalesCharts" className="navbar-link">
            visualization
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
