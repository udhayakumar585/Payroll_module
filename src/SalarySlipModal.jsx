import React from 'react';
import './salary-slip-modal.css'; 

const SalarySlipModal = ({ employee, isOpen, onClose }) => {
  if (!isOpen || !employee) return null;

  // Helper function for PDF download
  const downloadPDF = (emp) => {
    alert(`Downloading salary slip for ${emp.name} as PDF...`);
    // In real implementation, you would generate and download a PDF here
  };

  // Helper function to calculate allowances breakdown
  const calculateAllowances = () => {
    const hra = employee.allowances * 0.4;
    const transport = employee.allowances * 0.2;
    const medical = employee.allowances * 0.2;
    const other = employee.allowances * 0.2;
    return { hra, transport, medical, other };
  };

  // Helper function to calculate deductions breakdown
  const calculateDeductions = () => {
    const pf = employee.deductions * 0.4;
    const professionalTax = employee.deductions * 0.2;
    const tds = employee.deductions * 0.3;
    const otherDeductions = employee.deductions * 0.1;
    return { pf, professionalTax, tds, otherDeductions };
  };

  const allowances = calculateAllowances();
  const deductions = calculateDeductions();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="salary-slip-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Salary Slip - {employee.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="salary-slip-content">
          {/* Company Header */}
          <div className="company-header">
            <h1>Your Company Name</h1>
            <p>123 Business Street, City, State 12345</p>
            <p>PAN: XXXXX1234X | GSTIN: 29XXXXX1234X1Z5</p>
          </div>
          
          <div className="slip-details">
            {/* Employee Info */}
            <div className="section">
              <h3>Employee Information</h3>
              <div className="info-grid">
                <div>
                  <strong>Employee ID:</strong> EMP{employee.id.toString().padStart(3, '0')}
                </div>
                <div>
                  <strong>Employee Name:</strong> {employee.name}
                </div>
                <div>
                  <strong>Department:</strong> {employee.department}
                </div>
                <div>
                  <strong>Position:</strong> {employee.position}
                </div>
                <div>
                  <strong>Payment Date:</strong> {employee.paymentDate}
                </div>
                <div>
                  <strong>Payment Status:</strong> 
                  <span className={`status-badge status-${employee.status}`}>
                    {employee.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="section earnings-section">
              <h3>Earnings</h3>
              <table className="earnings-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Basic Salary</td>
                    <td>{employee.basicSalary.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>House Rent Allowance (HRA)</td>
                    <td>{allowances.hra.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Transport Allowance</td>
                    <td>{allowances.transport.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Medical Allowance</td>
                    <td>{allowances.medical.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Other Allowances</td>
                    <td>{allowances.other.toLocaleString()}</td>
                  </tr>
                  <tr className="total-row">
                    <td><strong>Total Earnings</strong></td>
                    <td><strong>{(employee.basicSalary + employee.allowances).toLocaleString()}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions */}
            <div className="section deductions-section">
              <h3>Deductions</h3>
              <table className="deductions-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Provident Fund (PF)</td>
                    <td>{deductions.pf.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Professional Tax</td>
                    <td>{deductions.professionalTax.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Tax Deducted at Source (TDS)</td>
                    <td>{deductions.tds.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Other Deductions</td>
                    <td>{deductions.otherDeductions.toLocaleString()}</td>
                  </tr>
                  <tr className="total-row">
                    <td><strong>Total Deductions</strong></td>
                    <td><strong>{employee.deductions.toLocaleString()}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="section summary-section">
              <div className="summary-grid">
                <div className="summary-item">
                  <span>Gross Salary:</span>
                  <span>₹{(employee.basicSalary + employee.allowances).toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <span>Total Deductions:</span>
                  <span className="text-danger">-₹{employee.deductions.toLocaleString()}</span>
                </div>
                <div className="summary-item total-net">
                  <strong>Net Salary Payable:</strong>
                  <strong className="net-amount">₹{employee.netSalary.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="slip-footer">
              <p>This is a computer-generated statement and does not require a signature.</p>
              <div className="signature-area">
                <div className="signature">
                  <p>______________________</p>
                  <p>Authorized Signatory</p>
                </div>
                <div className="signature">
                  <p>______________________</p>
                  <p>Employee Signature</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button className="btn-print" onClick={() => window.print()}>
              🖨️ Print Slip
            </button>
            <button className="btn-download" onClick={() => downloadPDF(employee)}>
              📥 Download PDF
            </button>
            <button className="btn-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipModal;