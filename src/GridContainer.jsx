// GridContainer.jsx
import React from 'react';
import PayrollModule from './payrollmodule.jsx';
import './GridContainer.css';

const GridContainer = () => {
  return (
    <div className="grid-container">
      <div className="grid-section dashboard-grid">
        <div className="grid-item header">
          <h2>💰 Payroll Management System</h2>
        </div>
        <div className="grid-item sidebar">
          <nav>
            <div className="nav-item ">Dashboard</div>
            <div className="nav-item">Employees</div>
            <div className="nav-item active">Payroll</div>
            <div className="nav-item">Reports</div>
            <div className="nav-item">Settings</div>
          </nav>
        </div>
        <div className="grid-item main">
          <PayrollModule />
        </div>
      </div>
    </div>
  );
};

export default GridContainer;