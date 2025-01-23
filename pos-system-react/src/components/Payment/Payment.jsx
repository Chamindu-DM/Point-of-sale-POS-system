import React from 'react';
import PropTypes from 'prop-types';
import './Payment.css';

const Payment = ({ total, paidAmount, onPaidAmountChange }) => {
  const balance = paidAmount - total;
  const isInsufficientAmount = paidAmount > 0 && paidAmount < total;

  return (
    <div className="payment-section">
      <div className="payment-input">
        <label htmlFor="paid-amount">Amount Paid (LKR):</label>
        <input className='iput-field'
          type="number"
          id="paid-amount"
          value={paidAmount || ''}
          onChange={onPaidAmountChange}
          min="0"
          step="1"
        />
      </div>
      <div className="payment-summary">
        <div>Total Amount: LKR {total.toFixed(2)}</div>
        {paidAmount > 0 && (
          <div className={`balance ${isInsufficientAmount ? 'insufficient' : ''}`}>
            {isInsufficientAmount ? (
              <span className="error">Insufficient Amount! Need LKR {Math.abs(balance).toFixed(2)} more</span>
            ) : (
              <span>Balance: LKR {balance.toFixed(2)}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Payment.propTypes = {
  total: PropTypes.number.isRequired,
  paidAmount: PropTypes.number.isRequired,
  onPaidAmountChange: PropTypes.func.isRequired
};

export default Payment;