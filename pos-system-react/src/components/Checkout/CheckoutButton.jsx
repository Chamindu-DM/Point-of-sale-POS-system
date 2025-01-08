import React from 'react';

const CheckoutButton = ({ onCheckout }) => {
    return (
        <button
            className="checkout-button"
            onClick={onCheckout}
        >
            Checkout
        </button>
    );
};

export default CheckoutButton;