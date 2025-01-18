import React from 'react';
import PropTypes from 'prop-types';
import './SalesHistory.css';

const SalesHistory = ({ sales }) => {
  return (
    <div className="sales-history">
      <h2>Sales History</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Date</th>
            <th>Items</th>
            <th>Quantity</th>
            <th>Total (LKR)</th>
            <th>Paid (LKR)</th>
            <th>Balance (LKR)</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.invoiceNumber}>
              <td>{sale.invoiceNumber}</td>
              <td>{new Date(sale.date).toLocaleString()}</td>
              <td>
                {sale.items.map(item => item.name).join(', ')}
              </td>
              <td>
                {sale.items.map(item => item.quantity).reduce((a, b) => a + b, 0)}
              </td>
              <td>{sale.total.toFixed(2)}</td>
              <td>{sale.paidAmount.toFixed(2)}</td>
              <td>{sale.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SalesHistory.propTypes = {
  sales: PropTypes.arrayOf(
    PropTypes.shape({
      invoiceNumber: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired
        })
      ).isRequired,
      total: PropTypes.number.isRequired,
      paidAmount: PropTypes.number.isRequired,
      balance: PropTypes.number.isRequired
    })
  ).isRequired
};

export default SalesHistory;