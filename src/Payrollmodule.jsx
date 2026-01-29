// PayrollModule.jsx
import React, { useState } from 'react';
import './PayrollModule.css';
import SalarySlipModal from './SalarySlipModal'; // Import the modal component

const PayrollModule = () => {
  const [employees, setEmployees] = useState([ // Change to setEmployees for state updates
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      department: 'IT', 
      position: 'Senior Developer',
      basicSalary: 75000,
      allowances: 15000,
      deductions: 8000,
      netSalary: 82000,
      status: 'paid',
      paymentDate: '2024-01-25'
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      department: 'HR', 
      position: 'HR Manager',
      basicSalary: 65000,
      allowances: 12000,
      deductions: 6000,
      netSalary: 71000,
      status: 'pending',
      paymentDate: '2024-01-30'
    },
    { 
      id: 3, 
      name: 'Amit Patel', 
      department: 'Finance', 
      position: 'Accountant',
      basicSalary: 55000,
      allowances: 10000,
      deductions: 5000,
      netSalary: 60000,
      status: 'processing',
      paymentDate: '2024-01-28'
    },
    { 
      id: 4, 
      name: 'Sneha Reddy', 
      department: 'Marketing', 
      position: 'Marketing Head',
      basicSalary: 80000,
      allowances: 20000,
      deductions: 10000,
      netSalary: 90000,
      status: 'paid',
      paymentDate: '2024-01-25'
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState(null); // NEW: State for modal
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false); // NEW: Modal visibility state
  const [formData, setFormData] = useState({
    basicSalary: '',
    allowances: '',
    deductions: '',
  });

  // Calculate total salary
  const totalSalary = employees.reduce((sum, emp) => sum + emp.netSalary, 0);

  // Process payroll
  const processPayroll = () => {
    // Update all pending employees to paid
    setEmployees(employees.map(emp => 
      emp.status === 'pending' || emp.status === 'processing'
        ? { 
            ...emp, 
            status: 'paid', 
            paymentDate: new Date().toLocaleDateString('en-IN') 
          }
        : emp
    ));
    alert('Payroll processing completed for all pending employees!');
  };

  // Calculate salary
  const calculateSalary = () => {
    const basic = parseFloat(formData.basicSalary) || 0;
    const allowances = parseFloat(formData.allowances) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    return basic + allowances - deductions;
  };

  // NEW: Handle viewing salary slip
  const handleViewSlip = (employee, e) => {
    e.stopPropagation(); // Prevent row selection
    setViewingEmployee(employee);
    setIsSlipModalOpen(true);
  };

  // NEW: Handle paying individual employee
  const handlePayNow = (employeeId, e) => {
    e.stopPropagation(); // Prevent row selection
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { 
            ...emp, 
            status: 'paid', 
            paymentDate: new Date().toLocaleDateString('en-IN') 
          }
        : emp
    ));
    alert('Payment processed successfully!');
  };

  // NEW: Download payslips
  const handleDownloadPayslips = () => {
    const paidEmployees = employees.filter(emp => emp.status === 'paid');
    if (paidEmployees.length === 0) {
      alert('No paid employees found to download payslips.');
      return;
    }
    alert(`Downloading payslips for ${paidEmployees.length} employee(s)...`);
  };

  // NEW: Email payslips
  const handleEmailPayslips = () => {
    alert('Sending email notifications to all employees...');
  };

  return (
    <div className="payroll-module">
      {/* Header with Actions */}
      <div className="payroll-header">
        <div>
          <h1>Payroll Processing</h1>
          <p>Manage salary payments and deductions</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={processPayroll}>
            🚀 Process Payroll
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowCalculator(!showCalculator)}
          >
            🧮 Salary Calculator
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="card-icon">👥</div>
          <div>
            <h3>Total Employees</h3>
            <p className="card-value">{employees.length}</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon">💰</div>
          <div>
            <h3>Total Salary</h3>
            <p className="card-value">₹{totalSalary.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon">✅</div>
          <div>
            <h3>Paid This Month</h3>
            <p className="card-value">{employees.filter(e => e.status === 'paid').length}</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon">⏳</div>
          <div>
            <h3>Pending</h3>
            <p className="card-value">{employees.filter(e => e.status !== 'paid').length}</p>
          </div>
        </div>
      </div>

      {/* Salary Calculator */}
      {showCalculator && (
        <div className="calculator-card">
          <h3>Salary Calculator</h3>
          <div className="calculator-form">
            <div className="input-group">
              <label>Basic Salary (₹)</label>
              <input 
                type="number"
                value={formData.basicSalary}
                onChange={(e) => setFormData({...formData, basicSalary: e.target.value})}
                placeholder="Enter basic salary"
              />
            </div>
            
            <div className="input-group">
              <label>Allowances (₹)</label>
              <input 
                type="number"
                value={formData.allowances}
                onChange={(e) => setFormData({...formData, allowances: e.target.value})}
                placeholder="Bonuses, incentives"
              />
            </div>
            
            <div className="input-group">
              <label>Deductions (₹)</label>
              <input 
                type="number"
                value={formData.deductions}
                onChange={(e) => setFormData({...formData, deductions: e.target.value})}
                placeholder="Tax, PF, insurance"
              />
            </div>
            
            <div className="calculator-result">
              <h4>Net Salary: ₹{calculateSalary().toLocaleString()}</h4>
            </div>
          </div>
        </div>
      )}

      {/* Employee Payroll Table */}
      <div className="payroll-table-container">
        <h2>Employee Payroll Details</h2>
        
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Position</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr 
                key={employee.id}
                className={selectedEmployee === employee.id ? 'selected' : ''}
                onClick={() => setSelectedEmployee(employee.id)}
              >
                <td>
                  <div className="employee-cell">
                    <div className="avatar">👤</div>
                    <div>
                      <strong>{employee.name}</strong>
                      <small>ID: EMP{employee.id.toString().padStart(3, '0')}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`dept-badge dept-${employee.department.toLowerCase()}`}>
                    {employee.department}
                  </span>
                </td>
                <td>{employee.position}</td>
                <td>₹{employee.basicSalary.toLocaleString()}</td>
                <td className="text-success">+₹{employee.allowances.toLocaleString()}</td>
                <td className="text-danger">-₹{employee.deductions.toLocaleString()}</td>
                <td className="net-salary">₹{employee.netSalary.toLocaleString()}</td>
                <td>
                  <span className={`status-badge status-${employee.status}`}>
                    {employee.status.toUpperCase()}
                  </span>
                </td>
                <td>{employee.paymentDate}</td>
                <td>
                  {employee.status !== 'paid' ? (
                    <button 
                      className="btn-pay"
                      onClick={(e) => handlePayNow(employee.id, e)}
                    >
                      💳 Pay Now
                    </button>
                  ) : (
                    <button 
                      className="btn-view"
                      onClick={(e) => handleViewSlip(employee, e)}
                    >
                      📄 View Slip
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payroll Summary */}
      <div className="payroll-summary">
        <h3>Payroll Summary - January 2026</h3>
        <div className="summary-details">
          <div className="summary-item">
            <span>Total Gross Salary:</span>
            <span>₹{(totalSalary * 1.15).toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span>Total Deductions:</span>
            <span>₹{(totalSalary * 0.15).toLocaleString()}</span>
          </div>
          <div className="summary-item total">
            <span>Net Payable Amount:</span>
            <span>₹{totalSalary.toLocaleString()}</span>
          </div>
        </div>
        <div className="summary-actions">
          <button className="btn btn-primary" onClick={handleDownloadPayslips}>
            📥 Download Payslips
          </button>
          <button className="btn btn-secondary" onClick={handleEmailPayslips}>
            📧 Email to All
          </button>
        </div>
      </div>

      {/* Salary Slip Modal */}
      <SalarySlipModal
        employee={viewingEmployee}
        isOpen={isSlipModalOpen}
        onClose={() => setIsSlipModalOpen(false)}
      />
    </div>
  );
};

export default PayrollModule;