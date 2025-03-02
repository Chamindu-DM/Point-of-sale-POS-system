import React from 'react';
import './CheckoutButton.css';

const CheckoutButton = ({ onCheckout, isLoading, disabled }) => {
    return (
        <button
            className="checkout-button"
            onClick={onCheckout}
            disabled={isLoading || disabled}
        >
            {isLoading ? 'Processing...' : 'Checkout'}
        </button>
    );
};

export default CheckoutButton;